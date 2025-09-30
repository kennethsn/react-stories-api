import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import StoryMomentTypography from '../../StoryMoment/StoryMomentTypography';
import Icon from '../../UI/Icon/Icon';
import StatValue from '../../UI/StatValue/StatValue';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './StatsMoment.styles';
import type { StatsMomentProps } from './StatsMoment.types';

const key = (index: number) => `${index}`;

const StatsMoment = observer(({ moment }: StatsMomentProps) => (
  <CardsBaseMoment
    gridColumnsMax={{
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    }}
    moment={moment}
    sx={styles.root}
  >
    {moment.items.map((stat, index) => {
      const accentColor = typeof stat.color === 'string'
        ? stat.color
        : stat.color?.background || '#1976d2';

      return (
        <Box
          key={key(index)}
          sx={{
            ...styles.statCard,
            background: '#fff',
            color: accentColor,
            position: 'relative',
          }}
        >
          <When condition={!!stat.icon}>
            <Box sx={{ ...styles.statIconBox, background: accentColor }}>
              <Icon
                icon={stat.icon!}
                sx={styles.statIcon}
              />
            </Box>
          </When>

          {stat.image ? <Box alt={stat.label || 'Stat image'} component="img" src={stat.image} sx={styles.statImage} /> : null}

          {stat.label ? (
            <Box sx={{ ...styles.statLabelBox, background: accentColor }}>
              <StoryMomentTypography field={`data.stats.${index}.label`} moment={moment} />
            </Box>
          ) : null}

          {stat.value !== undefined && (
            <Box sx={styles.statValue}>
              <StatValue accentColor={accentColor} type={stat.type} value={stat.value} />
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
