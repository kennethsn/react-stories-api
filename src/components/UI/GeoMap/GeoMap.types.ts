import type { SxProps } from '@mui/material/styles';
import type { PickingInfo } from 'deck.gl';
import type { PropsWithChildren } from 'react';

import type { GeoMapStoreOptions } from '../../../state/geoMapStore';
import type { StoriesAPIGeoJSONFeature } from '../../../types';

export type GeoMapContainerProps = PropsWithChildren & GeoMapProps;

export type GeoMapLayoutProps = Omit<GeoMapProps, 'geoMap'>;

export type GeoMapProps = GeoMapStoreOptions & {
  readonly sx?: SxProps;
};

export type GeoMapTooltipProps = {
  readonly pickingInfo: PickingInfo<StoriesAPIGeoJSONFeature>;
};
