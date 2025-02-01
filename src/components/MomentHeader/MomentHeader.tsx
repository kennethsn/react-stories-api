import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useColor from '../../hooks/useColor';
import StoryMomentTypography from '../StoryMoment/StoryMomentTypography';
import StorySlot from '../StorySlot/StorySlot';
import Icon from '../UI/Icon/Icon';
import styles from './MomentHeader.styles';
import type { MomentHeaderProps } from './MomentHeader.types';

const MomentHeader = observer(({ actions, moment }: MomentHeaderProps) => {
  const { background: backgroundColor, text: textColor } = useColor(moment.color);
  return (
    <Box
      bgcolor={backgroundColor}
      color={textColor}
      sx={styles.root}
    >
      <Box>
        <When condition={moment.hasIcon}>
          <Icon
            icon={moment.icon}
            sx={styles.icon}
          />
        </When>

        <StoryMomentTypography
          data-swiper-parallax="3800"
          field="title"
          fullWidth={false}
          moment={moment}
          multiline={false}
          sx={styles.title}
          variant="h6"
        />

        <When condition={!!actions}>
          {actions}
        </When>
      </Box>

      <When condition={moment.hasSubtitle}>
        <StoryMomentTypography
          data-swiper-parallax="-2800"
          field="subtitle"
          moment={moment}
          sx={styles.subtitle}
          variant="overline"
        />
      </When>

      <StorySlot component="MomentHeaderActions" />
    </Box>
  );
});

export default MomentHeader;
