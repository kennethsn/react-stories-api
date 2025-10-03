import { createContext } from 'react';

import type GeoMapStore from '../state/geoMapStore';

export type IGeoMapContext = GeoMapStore;

const GeoMapContext = createContext<GeoMapStore | null>(null);

export default GeoMapContext;
