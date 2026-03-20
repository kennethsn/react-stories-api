import { FlyToInterpolator, type MapViewState, type PickingInfo } from '@deck.gl/core';
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { makeAutoObservable, runInAction } from 'mobx';
import type { ClusterProperties } from 'supercluster';

import { GEOMAP_DEFAULT_MAP_TILES_URL } from '../constants';
import GeoMapClusterLayer, { type GeoMapClusterLayerDataItem, type GeoMapClusterLayerFeature } from '../models/GeoMapClusterLayer';
import type {
  Color,
  Content,
  GeoMap,
  GeoMapFocalPoint,
  StoriesAPIGeoJSONFeature,
  StoriesAPIGeoJSONFeatureProperties,
} from '../types';
import { filterExists } from '../utils/array';
import { buildTextContentBlock } from '../utils/contentUtils';
import {
  calculateLabelSpacingByZoom,
  getElevation,
  getFeatureCoordinates,
  getFeatureLonglat,
  getInfoKey,
  isClusterPropertiesObject,
  isStoriesAPIGeoJSONFeature,
  isStoriesAPIGeoJSONFeatureProperties,
} from '../utils/geoMapUtils';
import { formatNumberString } from '../utils/number';
import { deepCopy } from '../utils/object';
import type RootStore from './rootStore';

type GeoMapLabelFeature = StoriesAPIGeoJSONFeature & {
  clusterLabel?: string;
  clusterCount?: number;
  clusteredItems?: StoriesAPIGeoJSONFeature[];
};

export type GeoMapPickingInfo = PickingInfo<
StoriesAPIGeoJSONFeature | StoriesAPIGeoJSONFeatureProperties | ClusterProperties
>;

export type GeoMapStoreOptions = {
  readonly onChange?: (geoMap: GeoMap) => void;
  readonly editable?: boolean;
  readonly geoMap: GeoMap;
  readonly color?: Color
};

export type GeoMapTooltipState = {
  content: Content;
  x: number;
  y: number;
  pickingInfo: GeoMapPickingInfo;
};

export default class GeoMapStore {
  readonly color: Color;

  readonly geoMap: GeoMap;

  private initialGeoMap: GeoMap;

  private scrollInfoPanelToKey: ((key: string) => void) | null = null;

  private selectedKey: string | null = null;

  private tooltipLock: boolean = false;

  private tooltipState: GeoMapTooltipState | null = null;

  private tooltipTimer: NodeJS.Timeout | null = null;

  viewState: MapViewState;

  constructor(public root: RootStore, public options: GeoMapStoreOptions) {
    this.root = root;
    this.initialGeoMap = deepCopy(options.geoMap);
    this.color = options.color || { background: '#306cbfff', text: '#000000' };
    this.geoMap = deepCopy(options.geoMap);
    this.viewState = this.initialViewState;
    makeAutoObservable(this);
  }

  get clusterLayer() {
    if (!this.hasFeatures) return null;
    return new GeoMapClusterLayer({
      color: this.color,
      data: this.clusterLayerData,
      getSelected: this.isClusterIconSelected.bind(this),
      onHover: this.onCanvasHover,
      pickable: true,
      id: this.buildLayerId('clusters'),
      sizeScale: 40,
    });
  }

  get clusterLayerData(): GeoMapClusterLayerFeature[] {
    return this.features.map((feature) => ({
      ...feature,
      isSelected: this.isFeatureSelected(feature),
    }));
  }

  get clusterMinPointCount() {
    if (this.shouldShowLabels) return 2;
    return 1;
  }

  get informationItems() {
    const infoItems = Object.values(this.geoMap.information)
      .map((item) => ({
        ...item,
        isSelected: this.isSelected(item.key),
        select: () => this.selectKey(item.key),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return infoItems;
  }

  get features() {
    return this.geoMap.feature_collection.features;
  }

  get focalCoordinates() {
    return this.focalPoint.coordinates;
  }

  get focalPoint() {
    return this.geoMap.focal_point;
  }

  get hasInformation() {
    return this.informationItems.length > 0;
  }

  get hasFeatures() {
    return this.features.length > 0;
  }

  get hasPoints() {
    return this.points.length > 0;
  }

  get hasSelectedKey() {
    return !!this.selectedKey;
  }

  get hasShapes() {
    return this.shapes.length > 0;
  }

  get id() {
    return this.geoMap.id;
  }

  get initialViewState() {
    return {
      bearing: 0,
      pitch: 80,
      zoom: this.focalPoint.zoom,
      ...this.focalCoordinates,
    };
  }

  get labelLayer() {
    if (!this.shouldShowLabels) return null;
    return new TextLayer<GeoMapLabelFeature, { parameters: { depthTest: boolean } }>({
      backgroundPadding: [4, 8],
      billboard: true,
      characterSet: 'auto',
      data: this.labelLayerData,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontWeight: 100,
      getAlignmentBaseline: 'top',
      getAngle: 0,
      getColor: [0, 0, 0, 255],
      getPosition: getFeatureLonglat,
      getText: this.getLabelLayerText,
      getTextAnchor: 'middle',
      getSize: this.labelSize,
      id: this.buildLayerId('labels'),
      maxWidth: 10,
      parameters: {
        depthTest: false, // Ensures text isn't hidden by 3D objects
      },
      pickable: false,
      sizeMaxPixels: 12,
      sizeScale: 16,
      sizeUnits: 'pixels',
    });
  }

  get labelLayerData() {
    const spacing = this.labelSpacing;
    const labelFeatureGroups = new Map<string, GeoMapLabelFeature[]>();
    this.features.forEach((d) => {
      const coordinates = getFeatureCoordinates(d);
      if (!coordinates) return;
      const { latitude, longitude } = coordinates;
      const key = `${Math.round(longitude / spacing)}:${Math.round(latitude / spacing)}`;
      if (!labelFeatureGroups.has(key)) {
        labelFeatureGroups.set(key, []);
      }
      labelFeatureGroups.get(key)!.push(d);
    });
    const result: GeoMapLabelFeature[] = [];
    labelFeatureGroups.values().forEach((group) => {
      const [primary, ...rest] = group;
      const label = this.getLabel(primary);
      const clusterLabel = rest.length > 0
        ? `${label}\n(+${formatNumberString(rest.length)} more)`
        : label;
      result.push({
        ...primary,
        clusterLabel,
        clusterCount: group.length,
        clusteredItems: group,
      });
    });
    return result;
  }

  get labelSize() {
    return 16 * 2 ** ((this.zoom - 10) * 0.1);
  }

  get labelSpacing() {
    return calculateLabelSpacingByZoom(this.zoom);
  }

  get layers() {
    return filterExists([
      this.shapesLayer,
      this.pointsLayer,
      this.clusterLayer,
      this.labelLayer,
    ]);
  }

  get points() {
    return this.getFeaturesByType('Point');
  }

  get pointsLayer() {
    if (!this.hasPoints) return null;
    return new GeoJsonLayer<StoriesAPIGeoJSONFeatureProperties>({
      data: this.points,
      extruded: true,
      filled: true,
      getElevation,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [255, 255, 255],
      getLineWidth: 20,
      getPointRadius: 50,
      id: this.buildLayerId('points'),
      onHover: this.onCanvasHover,
      opacity: 0.5,
      pickable: true,
      pointType: 'circle+text',
      stroked: false,
      wireframe: true,
    });
  }

  get shapesLayer() {
    if (!this.hasShapes) return null;
    return new GeoJsonLayer<StoriesAPIGeoJSONFeatureProperties>({
      data: this.shapes,
      extruded: true,
      filled: true,
      getElevation,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [255, 255, 255],
      getLineWidth: 20,
      getPointRadius: 160,
      id: this.buildLayerId('shapes'),
      onHover: this.onCanvasHover,
      opacity: 0.5,
      pointType: 'circle+text',
      pickable: true,
      stroked: false,
      wireframe: true,
    });
  }

  get shapes() {
    return this.filterFeatures((f) => f.geometry.type !== 'Point');
  }

  get shouldShowLabels() {
    return this.hasFeatures;
  }

  get shouldShowTooltip() {
    return !!this.tooltipState;
  }

  get tilesURL() {
    return this.geoMap.tiles_url || GEOMAP_DEFAULT_MAP_TILES_URL;
  }

  get tooltipContent() {
    return this.tooltipState?.content;
  }

  get tooltipLeft() {
    return this.tooltipState?.x;
  }

  get tooltipTop() {
    return this.tooltipState?.y;
  }

  get zoom() {
    return this.viewState.zoom;
  }

  buildLayerId(layerName: string) {
    return `geo-map-${this.id}-${layerName}`;
  }

  buildTooltipContent(pickingInfo: GeoMapPickingInfo): Content | null {
    const { object } = pickingInfo;
    if (!object) {
      return null;
    }
    if (isClusterPropertiesObject(object)) {
      const count = object.point_count;
      const formattedCount = formatNumberString(count);
      return {
        id: object.cluster_id.toString(),
        blocks: [
          buildTextContentBlock(`${formattedCount} place${count !== 1 ? 's' : ''}`),
          buildTextContentBlock('click to zoom in', { variant: 'finePrint' }),
        ],
      };
    }
    if (isStoriesAPIGeoJSONFeatureProperties(object)) {
      const info = this.getInfoByKey(object.information_key);
      if (!info?.label) {
        return null;
      }
      const blocks = [buildTextContentBlock(info.label)];
      if (info.description) {
        blocks.push(buildTextContentBlock(info.description, { variant: 'finePrint' }));
      }
      return {
        id: info?.key || 'unknown',
        blocks,
      };
    }
    const label = this.getLabel(object);
    if (!label) {
      return null;
    }
    const blocks = [buildTextContentBlock(label)];
    const description = this.getDescription(object);
    if (description) {
      blocks.push(buildTextContentBlock(description, { variant: 'finePrint' }));
    }
    return { id: object.properties?.information_key || 'unknown', blocks };
  }

  expandCluster(clusterId: number) {
    if (!this.clusterLayer) return;
    const zoom = this.clusterLayer.getExpansionZoom(clusterId) + 0.25;
    const coordinates = this.clusterLayer.getCoordinates(clusterId);
    if (coordinates) {
      this.goTo({
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom,
      });
    }
  }

  filterFeatures(filterFunc: (feature: StoriesAPIGeoJSONFeature) => boolean) {
    return this.features.filter(filterFunc);
  }

  getDescription = (feature: StoriesAPIGeoJSONFeature) => {
    const info = this.getInfo(feature);
    return info?.description;
  };

  getFeatureFocalPointByKey(key: string) {
    const info = this.getInfoByKey(key);
    return info?.focal_point;
  }

  getFeaturesByType(type: 'Point' | 'Polygon') {
    return this.filterFeatures((f) => f.geometry.type === type);
  }

  getInfo(feature: StoriesAPIGeoJSONFeature) {
    const key = getInfoKey(feature);
    return this.getInfoByKey(key);
  }

  getInfoByKey(key: string) {
    return this.geoMap.information[key];
  }

  getLabel = (feature: StoriesAPIGeoJSONFeature) => {
    const info = this.getInfo(feature);
    return info?.label;
  };

  getLabelLayerText = (feature: GeoMapLabelFeature) => (
    feature.clusterLabel || this.getLabel(feature)
  );

  goTo(viewState: Partial<MapViewState>) {
    this.setViewState({
      ...this.viewState,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      ...viewState,
    });
  }

  goToFocalPoint({ coordinates, zoom }: GeoMapFocalPoint) {
    this.goTo({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      zoom,
    });
  }

  goToKey(key: string) {
    const focalPoint = this.getFeatureFocalPointByKey(key);
    if (!focalPoint) return;
    this.goToFocalPoint(focalPoint);
  }

  hideTooltip() {
    if (this.tooltipLock) return;
    this.setTooltipState(null);
  }

  isClusterIconSelected(dataItem: GeoMapClusterLayerDataItem) {
    if (!isStoriesAPIGeoJSONFeature(dataItem)) return false;
    return this.isFeatureSelected(dataItem);
  }

  isFeatureSelected(feature: StoriesAPIGeoJSONFeature) {
    const key = getInfoKey(feature);
    return this.isSelected(key);
  }

  isSelected(key: string) {
    return key === this.selectedKey;
  }

  lockTooltip() {
    runInAction(() => {
      this.tooltipLock = true;
      if (this.tooltipTimer) {
        clearTimeout(this.tooltipTimer);
        this.tooltipTimer = null;
      }
    });
  }

  onCanvasClick(info: GeoMapPickingInfo) {
    runInAction(() => {
      const { object } = info;
      this.unselectKey();
      if (!object) return;
      if (isClusterPropertiesObject(object)) {
        this.expandCluster(object.cluster_id);
      } else if (isStoriesAPIGeoJSONFeature(object)) {
        this.selectKey(object.properties.information_key);
      } else if (isStoriesAPIGeoJSONFeatureProperties(object)) {
        this.selectKey(object.information_key);
      }
    });
  }

  onCanvasHover = (pickingInfo: GeoMapPickingInfo) => {
    const { x, y, object } = pickingInfo || {};
    const content = object && this.buildTooltipContent(pickingInfo);
    if (!content) {
      this.hideTooltip();
      return;
    }
    this.setTooltipState({
      content,
      pickingInfo,
      x,
      y,
    }, 0);
  };

  onTooltipClick = () => {
    if (!this.tooltipState) return;
    const { pickingInfo } = this.tooltipState;
    this.onCanvasClick(pickingInfo);
  };

  selectKey(key: string) {
    runInAction(() => {
      this.selectedKey = key;
    });
    this.goToKey(key);
    this.scrollInfoPanelToKey?.(key);
  }

  setScrollInfoPanelToKeyFunction(func: (key: string) => void) {
    runInAction(() => {
      this.scrollInfoPanelToKey = func;
    });
  }

  setTooltipState(tooltipState: GeoMapTooltipState | null, delay = 600) {
    runInAction(() => {
      if (this.tooltipTimer) {
        clearTimeout(this.tooltipTimer);
        this.tooltipTimer = null;
      }
      this.tooltipTimer = setTimeout(() => {
        runInAction(() => {
          this.tooltipState = tooltipState;
        });
      }, delay);
    });
  }

  setViewState(viewState: MapViewState) {
    runInAction(() => {
      this.viewState = viewState;
    });
  }

  unlockTooltip() {
    runInAction(() => {
      this.tooltipLock = false;
      this.hideTooltip();
    });
  }

  unselectKey() {
    runInAction(() => {
      this.selectedKey = null;
    });
  }
}
