import { observer } from 'mobx-react-lite';

import type IFrameMomentStore from '../../../state/moments/iframeMomentStore';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import type { MiradorMomentProps } from './MiradorMoment.types';

const MiradorMoment = observer(({ moment }: MiradorMomentProps) => (
  <IFrameMoment moment={moment as IFrameMomentStore} />
));

export default MiradorMoment;
