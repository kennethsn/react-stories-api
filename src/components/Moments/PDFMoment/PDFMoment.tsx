import { observer } from 'mobx-react-lite';

import IFrameMomentStore from '../../../state/moments/iframeMomentStore';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import { PDFMomentProps } from './PDFMoment.types';

const PDFMoment = observer(({ moment }: PDFMomentProps) => (
  <IFrameMoment moment={moment as IFrameMomentStore} />
));

export default PDFMoment;
