import Button, { type ButtonProps } from '@mui/material/Button';

import useStoriesAPINavigation from '../../hooks/useStoriesAPINavigation';
import type { StoriesAPIButtonProps } from './StoriesAPIButton.types';

export default function StoriesAPIButton({ button, onClick, ...props }: StoriesAPIButtonProps) {
  const { goTo } = useStoriesAPINavigation();
  const handleClick: ButtonProps['onClick'] = (e) => (onClick ? onClick(e) : goTo(button));
  return (
    <Button
      color={button.color ?? 'primary'}
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {button.label ?? 'Learn More'}
    </Button>
  );
}
