import { useContext } from 'react';

import GeoMapContext from '../contexts/GeoMapContext';

export default function useGeoMap() {
  const context = useContext(GeoMapContext);
  if (!context?.geoMap) {
    throw new Error('Using GeoMap Hook outside of GeoMapProvider or with uninitialized GeoMap');
  }
  return context;
}
