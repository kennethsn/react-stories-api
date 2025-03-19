import { observer } from 'mobx-react-lite';

import type IFrameMomentStore from '../../../state/moments/iframeMomentStore';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import { WikipediaMomentProps } from './WikipediaMoment.types';

const WikipediaMoment = observer(({ moment }: WikipediaMomentProps) => (
  <IFrameMoment moment={moment as IFrameMomentStore} />
));

export default WikipediaMoment;
