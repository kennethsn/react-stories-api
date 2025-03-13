import { observer } from 'mobx-react-lite';

import BaseMoment from '../BaseMoment/BaseMoment';
import type { TextMomentProps } from './TextMoment.types';

const TextMoment = observer(({ moment }: TextMomentProps) => (
  <BaseMoment
    hideContent
    moment={moment}
  />
));

export default TextMoment;
