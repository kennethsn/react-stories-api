// Originally written by deck.gl under MIT license
// https://github.com/visgl/deck.gl/blob/9.1-release/examples/website/icon/icon-cluster-layer.ts
// Modified by Stories Services Team to integrate with Stories API

import type { PickingInfo, UpdateParameters } from '@deck.gl/core';
import { CompositeLayer } from '@deck.gl/core';
import { IconLayer, IconLayerProps } from '@deck.gl/layers';
import type { ClusterFeature, ClusterProperties, PointFeature } from 'supercluster';
import Supercluster from 'supercluster';

import type { Color, StoriesAPIGeoJSONFeature } from '../types';
import {
  buildMapMarkerSVG, convertFeatureToPoint,
  isClusterPropertiesObject,
  isPoint,
} from '../utils/geoMapUtils';

export type GeoMapClusterLayerDataItem = (
  PointFeature<GeoMapClusterLayerFeature> | ClusterFeature<GeoMapClusterLayerFeature>
);

export type GeoMapClusterLayerFeature = StoriesAPIGeoJSONFeature & {
  isSelected: boolean;
};

export type GeoMapClusterLayerPickingInfo<DataT> = PickingInfo<
DataT | (DataT & ClusterProperties),
{ objects?: DataT[] }
>;

export type GeoClusterLayerProps = Required<IconLayerProps<GeoMapClusterLayerFeature>> & {
  color: Color;
  getSelected?: (feature: GeoMapClusterLayerDataItem) => boolean;
};

type State = {
  data: GeoMapClusterLayerDataItem[];
  index: Supercluster<GeoMapClusterLayerFeature, GeoMapClusterLayerFeature>;
  z: number;
  icons: {
    default: string;
    selected: string;
  };
};

export default class GeoMapClusterLayer extends CompositeLayer<GeoClusterLayerProps> {
  static layerName = 'GeoMapClusterLayer';

  // @ts-expect-error state is initialized in initializeState()
  state: State;

  getPickingInfo({ info, mode }: {
    info: PickingInfo<GeoMapClusterLayerDataItem>;
    mode: string;
  }): GeoMapClusterLayerPickingInfo<GeoMapClusterLayerFeature> {
    const pickedObject = info.object?.properties;
    if (!pickedObject) {
      return { ...info, object: undefined };
    }
    let objects: GeoMapClusterLayerFeature[] | undefined;
    if (isClusterPropertiesObject(pickedObject) && pickedObject.cluster && mode !== 'hover') {
      objects = this.state.index
        .getLeaves(pickedObject.cluster_id, 25)
        .map((f) => f.properties);
    }
    return { ...info, object: pickedObject, objects };
  }

  initializeState(): void {
    const { color } = this.props;

    this.setState({
      data: [],
      z: -1,
      index: new Supercluster(),
      icons: {
        selected: buildMapMarkerSVG(color.background, 1.0),
        default: buildMapMarkerSVG(color.background, 0.5),
      },
    });
  }

  getCoordinates(clusterId: number): number[] | null {
    const cluster = this.state.data.find((d) => d.id === clusterId);
    return cluster ? cluster.geometry.coordinates : null;
  }

  getExpansionZoom(clusterId: number): number {
    return this.state.index.getClusterExpansionZoom(clusterId);
  }

  renderLayers() {
    const { data, icons } = this.state;
    const { id, sizeScale, getSelected } = this.props;

    return new IconLayer<GeoMapClusterLayerDataItem>(
      {
        billboard: true,
        data,
        id: `${id}::icon-layer`,
        getIcon: (d) => {
          const isSelected = getSelected?.(d) ?? false;
          return {
            anchorY: 64,
            height: 64,
            url: isSelected ? icons.selected : icons.default,
            width: 64,
          };
        },
        getPosition: (d) => d.geometry.coordinates as [number, number],
        getSize: 0.75,
        pickable: true,
        sizeScale,
        sizeUnits: 'pixels',
      },
      this.getSubLayerProps({
        id: `${id}::icon-sublayer`,
      }),
    );
  }

  // @ts-expect-error overrides base class without this called
  // eslint-disable-next-line class-methods-use-this
  shouldUpdateState({ changeFlags }: UpdateParameters<IconLayer>): boolean {
    return changeFlags.somethingChanged;
  }

  // @ts-expect-error overrides base class with different signature
  updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (rebuildIndex) {
      const index = new Supercluster<GeoMapClusterLayerFeature, GeoMapClusterLayerFeature>({
        maxZoom: 16,
        radius: props.sizeScale * Math.sqrt(2),
      });
      const { data } = props;
      if (!Array.isArray(data)) {
        throw new Error('GeoMapClusterLayer: data prop must be an array of GeoJSON features.');
      }

      const processedData = data
        .map(convertFeatureToPoint<GeoMapClusterLayerFeature>)
        .filter(isPoint);

      index.load(processedData);
      this.setState({ index });
    }

    const z = Math.floor(this.context.viewport.zoom);
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z,
      });
    }

    // If the color prop changed, regenerate the icon URLs
    if (props.color !== oldProps.color) {
      this.setState({
        icons: {
          selected: buildMapMarkerSVG(props.color.background, 1.0),
          default: buildMapMarkerSVG(props.color.background, 0.5),
        },
      });
    }
  }
}
