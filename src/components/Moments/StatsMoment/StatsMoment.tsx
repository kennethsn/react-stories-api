import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import Icon from '../../UI/Icon/Icon';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './StatsMoment.styles';
import type { StatsMomentProps } from './StatsMoment.types';

const key = (index: number) => `${index}`;

const StatsMoment = observer(({ moment }: StatsMomentProps) => (
  <CardsBaseMoment moment={moment} sx={styles.root}>
    {moment.items.map((stat, index) => {
      const backgroundColor = typeof stat.color === 'string' ? stat.color : stat.color?.background;
      const textColor = typeof stat.color === 'string' ? '#fff' : stat.color?.text;

      return (
        <Box
          key={key(index)}
          sx={{
            ...styles.statCard,
            background: backgroundColor,
            color: textColor,
          }}
        >
          <When condition={!!stat.icon}>
            <Icon
              icon={stat.icon!}
              sx={styles.statIcon}
            />
          </When>

          {stat.image ? <Box alt={stat.label || 'Stat image'} component="img" src={stat.image} sx={styles.statImage} /> : null}

          {stat.label ? (
            <Box sx={styles.statLabel}>
              <StoryMomentTypography field={`data.stats.${index}.label`} moment={moment} />
            </Box>
          ) : null}

          {stat.value !== undefined && (
            <Box sx={styles.statValue}>
              <StoryMomentTypography field={`data.stats.${index}.value`} moment={moment} />
            </Box>
          )}

          {stat.description ? (
            <Box sx={styles.statDescription}>
              <StoryMomentTypography field={`data.stats.${index}.description`} moment={moment} />
            </Box>
          ) : null}
        </Box>
      );
    })}
  </CardsBaseMoment>
));

export default StatsMoment;
