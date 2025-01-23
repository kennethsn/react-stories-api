import { observer } from 'mobx-react-lite';

import BoundTypography from '../UI/BoundTypography/BoundTypography';
import type { StoryMomentTypographyProps } from './StoryMoment.types';

const StoryMomentTypography = observer(({ moment, ...props }: StoryMomentTypographyProps) => (
  <BoundTypography
    store={moment}
      // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

export default StoryMomentTypography;
