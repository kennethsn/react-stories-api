import { observer } from 'mobx-react-lite';

import GeoMap from '../../UI/GeoMap/GeoMap';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { GeoMapMomentProps } from './GeoMapMoment.types';

const GeoMapMoment = observer(({ moment }: GeoMapMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    <GeoMap geoMap={moment.geoMapData} />
  </BaseMoment>
));

export default GeoMapMoment;
