import { observer } from 'mobx-react-lite';

import BaseMoment from '../BaseMoment/BaseMoment';
import type { ErrorMomentProps } from './ErrorMoment.types';

const ErrorMoment = observer(({ moment }: ErrorMomentProps) => (
  <BaseMoment
    hideContent
    moment={moment}
    noContentElevation
  />
));

export default ErrorMoment;
