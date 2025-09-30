import { observer } from 'mobx-react-lite';

import type { GeoMapProps } from './GeoMap.types';
import GeoMapContainer from './GeoMapContainer';
import GeoMapLayout from './GeoMapLayout';

const GeoMap = observer(({ geoMap, sx }: GeoMapProps) => (
  <GeoMapContainer geoMap={geoMap}>
    <GeoMapLayout sx={sx} />
  </GeoMapContainer>
));

export default GeoMap;
