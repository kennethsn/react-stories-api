import Box from '@mui/material/Box';
import { Else, If, Then } from 'react-if';

import { getRandomNumber } from '../../../utils/math';
import { deepMerge } from '../../../utils/object';
import Animation from '../Animation/Animation';
import styles from './Cards.styles';
import type { CardsItemProps } from './Cards.types';

export default function CardsItem({
  children,
  disableAnimation,
  sx,
}: CardsItemProps) {
  return (
    <Box sx={deepMerge(styles.item, sx)}>
      <If condition={disableAnimation}>
        <Then>
          {children}
        </Then>

        <Else>
          <Animation
            animation="fadeUp"
            persist
            speed={getRandomNumber(600, 1500)}
          >
            {children}
          </Animation>
        </Else>
      </If>
    </Box>
  );
}
