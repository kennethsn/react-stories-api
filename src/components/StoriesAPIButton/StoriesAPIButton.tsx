import Button, { type ButtonProps } from '@mui/material/Button';

import useColor from '../../hooks/useColor';
import useStoriesAPINavigation from '../../hooks/useStoriesAPINavigation';
import { deepMerge } from '../../utils/object';
import ThemeOverride from '../UI/ThemeOverride/ThemeOverride';
import styles from './StoriesAPIButton.styles';
import type { StoriesAPIButtonProps } from './StoriesAPIButton.types';

export default function StoriesAPIButton({
  button,
  onClick,
  variant,
  sx,
  ...props
}: StoriesAPIButtonProps) {
  const { background, themeOptions } = useColor(button.color);
  const { goTo } = useStoriesAPINavigation();
  const handleClick: ButtonProps['onClick'] = (e) => (onClick ? onClick(e) : goTo(button));
  return (
    <ThemeOverride themeOptions={themeOptions}>
      <Button
        disabled={button.is_disabled}
        onClick={handleClick}
        sx={deepMerge(styles.root(background), sx)}
        variant={button.variant ?? variant ?? 'contained'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {button.label ?? 'Learn More'}
      </Button>
    </ThemeOverride>
  );
}
