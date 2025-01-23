import { observer } from 'mobx-react-lite';

import { useStory } from '../../hooks';
import BoundTypography from '../UI/BoundTypography/BoundTypography';
import type { StoryTypographyProps } from './StoryTypography.types';

const StoryTypography = observer(({ ...props }: StoryTypographyProps) => {
  const story = useStory();
  return (
    <BoundTypography
      store={story}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default StoryTypography;
