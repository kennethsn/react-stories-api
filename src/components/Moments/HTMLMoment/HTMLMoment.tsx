import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';

import BaseMoment from '../BaseMoment/BaseMoment';
import type { HTMLMomentProps } from './HTMLMoment.types';

const HTMLMoment = observer(({ moment }: HTMLMomentProps) => (
  <BaseMoment
    moment={moment}
  >
    {parse(moment.content)}
  </BaseMoment>
));

export default HTMLMoment;
