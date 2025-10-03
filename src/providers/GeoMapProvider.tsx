import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { When } from 'react-if';

import type { GeoMapProps } from '../components/UI/GeoMap/GeoMap.types';
import GeoMapContext from '../contexts/GeoMapContext';
import useColor from '../hooks/useColor';
import useStoriesAPI from '../hooks/useStoriesAPI';
import type GeoMapStore from '../state/geoMapStore';
import type { GeoMap } from '../types';

type GeoMapProviderProps = Omit<GeoMapProps, 'geoMap'> & PropsWithChildren & {
  readonly geoMap?: GeoMap;
  readonly store?: GeoMapStore
};

const GeoMapProvider = observer(({
  children,
  store,
  ...props
}: GeoMapProviderProps) => {
  const { geoMap } = props;
  if (!geoMap && !store) {
    throw new Error('GeoMap data not found.');
  }
  const { isDebugging, geoMaps } = useStoriesAPI();
  const color = useColor();

  useEffect(() => autorun(() => {
    if (store) return;
    if (!geoMap) {
      throw new Error('GeoMap data not found.');
    }
    if (isDebugging) {
      // eslint-disable-next-line no-console
      console.debug('GeoMapProvider useEffect called');
    }

    geoMaps.loadGeoMap({ ...props, color, geoMap }, undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    props.onChange,
    props.editable,
    props.geoMap,
  ]);
  const geoMapStore = store || geoMaps.getGeoMap(geoMap!.id);
  return (
    <When condition={!!geoMapStore}>
      <GeoMapContext.Provider value={geoMapStore!}>
        {children}
      </GeoMapContext.Provider>
    </When>
  );
});

export default GeoMapProvider;
