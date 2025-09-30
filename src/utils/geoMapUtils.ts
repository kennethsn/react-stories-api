import type { Feature, Geometry } from 'geojson';
import type { ClusterProperties, PointFeature } from 'supercluster';

import type { StoriesAPIGeoJSONFeature, StoriesAPIGeoJSONFeatureProperties } from '../types';

export const buildMapMarkerSVG = (color: string, opacity: number = 1): string => {
  const svg = `
    <svg
      height="64"
      width="64"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="${color}"
        fill-opacity="${opacity}"
        d="
          M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75
          7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z
        "
      />
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const calculateLabelSpacingByZoom = (zoom: number) => {
  if (zoom < 6) return 0.2; // ~10–15 km
  if (zoom < 7) return 0.17; // ~7–10 km
  if (zoom < 8) return 0.12; // ~5–7 km
  if (zoom < 10) return 0.02; // ~2 km
  if (zoom < 12) return 0.01; // ~1 km
  if (zoom < 14) return 0.005; // ~50 m
  return 0.00025; // ~250 m
};

export const convertFeatureToPoint = <T=StoriesAPIGeoJSONFeatureProperties>(
  feature: Feature<Geometry, T>,
): PointFeature<T> | null => {
  if (isPoint<T>(feature)) return feature;
  if (!isStoriesAPIGeoJSONFeature(feature)) return null;
  const coordinates = getFeatureLonglat(feature);
  if (!coordinates) return null;
  return {
    ...feature,
    geometry: {
      coordinates,
      type: 'Point',
    },
    type: 'Feature',
  };
};

export const getElevation = (feature: StoriesAPIGeoJSONFeature) => {
  const elevation = feature.properties?.elevation;
  if (typeof elevation === 'number') {
    return elevation;
  }
  // Ensure Points are always on top of shapes
  if (isPoint(feature)) {
    return 5;
  }
  return 0;
};

export const getFeatureCoordinates = (feature: StoriesAPIGeoJSONFeature) => {
  const focalPoint = getFeatureFocalPoint(feature);
  return focalPoint?.coordinates;
};

export const getFeatureFocalPoint = (feature: StoriesAPIGeoJSONFeature) => (
  feature.properties?.focal_point
);

export const getFeatureLonglat = (feature: StoriesAPIGeoJSONFeature) => {
  const coordinates = getFeatureCoordinates(feature);
  return coordinates?.longlat;
};

export const getInfoKey = (feature: StoriesAPIGeoJSONFeature) => (
  feature.properties?.information_key
);

export const isClusterPropertiesObject = (
  obj: object,
): obj is ClusterProperties => (
  obj && 'cluster' in obj && typeof obj.cluster === 'boolean' && obj.cluster
);

export const isPoint = <T=StoriesAPIGeoJSONFeatureProperties>(
  feature: Feature<Geometry, T> | null,
): feature is PointFeature<T> => feature?.geometry.type === 'Point';

export const isStoriesAPIGeoJSONFeature = (
  obj: object,
): obj is StoriesAPIGeoJSONFeature => (
  obj && 'properties' in obj
  && typeof obj.properties === 'object'
  && obj.properties !== null
  && isStoriesAPIGeoJSONFeatureProperties(obj.properties)
);

export const isStoriesAPIGeoJSONFeatureProperties = (
  obj: object,
): obj is StoriesAPIGeoJSONFeatureProperties => (
  obj && 'information_key' in obj && typeof obj.information_key === 'string'
);
