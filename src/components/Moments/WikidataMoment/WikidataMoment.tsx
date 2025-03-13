import { observer } from 'mobx-react-lite';

import type IFrameMomentStore from '../../../state/moments/iframeMomentStore';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import type { WikidataMomentProps } from './WikidataMoment.types';

const WikidataMoment = observer(({ moment }: WikidataMomentProps) => (
  <IFrameMoment moment={moment as IFrameMomentStore} />
));

export default WikidataMoment;
