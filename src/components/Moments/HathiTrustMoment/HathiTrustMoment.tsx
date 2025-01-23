import { observer } from 'mobx-react-lite';

import type IFrameMomentStore from '../../../state/moments/iframeMomentStore';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import type { HathiTrustMomentProps } from './HathiTrustMoment.types';

const HathiTrustMoment = observer(({ moment }: HathiTrustMomentProps) => (
  <IFrameMoment moment={moment as IFrameMomentStore} />
));

export default HathiTrustMoment;
