import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import useColor from '../../hooks/useColor';
import Icon from '../UI/Icon/Icon';
import styles from './MomentHeader.styles';
import type { MomentHeaderProps } from './MomentHeader.types';

export default function MomentHeader({ moment }: MomentHeaderProps) {
  const {
    color,
    icon,
    subtitle,
    title,
  } = moment;
  const { background: backgroundColor, text: textColor } = useColor(color);
  return (
    <Box
      bgcolor={backgroundColor}
      color={textColor}
      sx={styles.root}
    >
      <Typography
        data-swiper-parallax="3800"
        sx={styles.title}
        variant="h6"
      >
        <When condition={!!icon}>
          <Icon
            icon={icon}
            sx={styles.icon}
          />
        </When>

        {title}
      </Typography>

      <When condition={!!subtitle}>
        <Typography
          data-swiper-parallax="-2800"
          sx={styles.subtitle}
          variant="overline"
        >
          {subtitle}
        </Typography>
      </When>
    </Box>

  );
}
