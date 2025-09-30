import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import useGeoMap from '../../../hooks/useGeoMap';
import GeoMapCanvas from './GeoMapCanvas';
import GeoMapPanelGroup from './GeoMapPanelGroup';

const GeoMapDesktopLayout = observer(() => {
  const geoMap = useGeoMap();
  return (
    <If condition={geoMap.hasInformation}>
      <Then>
        <GeoMapPanelGroup />
      </Then>

      <Else>
        <GeoMapCanvas />
      </Else>
    </If>
  );
});

export default GeoMapDesktopLayout;
