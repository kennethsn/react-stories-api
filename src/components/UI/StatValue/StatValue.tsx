import {
  Avatar, Box, List, ListItem, Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import CountUp from 'react-countup';

import type {
  StatListValueItem, StatNumberValue, StatType, StatValue as StatValueType,
} from '../../../types';
import Icon from '../Icon/Icon';
import styles from './StatValue.styles';

interface Props {
  accentColor?: string;
  type: StatType;
  value: StatValueType;
}

const StatValue = observer(({ type, value, accentColor = '#1976d2' }: Props) => {
  if (!value) return null;

  switch (type) {
    case 'number': {
      const numValue = value as StatNumberValue;
      return (
        <Box sx={styles.numberContainer}>
          <Typography component="span" sx={{ ...styles.number, color: accentColor }}>
            <CountUp
              duration={1.5}
              end={(value as StatNumberValue).amount}
              separator=","
              start={0}
            />
          </Typography>

          {numValue.unit ? (
            <Typography component="span" sx={{ ...styles.unit, color: accentColor }}>
              {' '}

              {numValue.unit}
            </Typography>
          ) : null}
        </Box>
      );
    }

    case 'string': {
      const strValue = value as string;
      const wordCount = strValue.trim().split(/\s+/).length;
      const isShortStr = wordCount <= 2;
      return (
        <Typography sx={{
          ...(isShortStr ? styles.stringLarge : styles.stringSmall),
          color: isShortStr ? accentColor : 'inherit',
        }}
        >
          {value as string}
        </Typography>
      );
    }

    case 'list': {
      const listValues = value as StatListValueItem[];
      return (
        <List sx={styles.list}>
          {listValues.map((item) => (
            <ListItem key={item.label} sx={styles.listItem}>
              {item.icon ? (
                <Box sx={styles.listAvatarContainer}>
                  <Avatar sx={{ ...styles.listAvatar, backgroundColor: accentColor }}>
                    <Icon icon={item.icon} />
                  </Avatar>
                </Box>
              ) : null}

              <Box>
                <Typography sx={styles.listItemLabel}>{item.label}</Typography>

                {item.description ? (
                  <Typography sx={styles.listItemDescription} variant="body2">
                    {item.description}
                  </Typography>
                ) : null}
              </Box>
            </ListItem>
          ))}
        </List>
      );
    }

    default:
      return null;
  }
});

export default StatValue;
