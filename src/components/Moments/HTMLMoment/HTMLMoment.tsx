import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';

import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './HTMLMoment.styles';
import type { HTMLMomentProps } from './HTMLMoment.types';

const HTMLMoment = observer(({ moment }: HTMLMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    <Box sx={styles.root}>
      {parse(moment.content)}
    </Box>
  </BaseMoment>
));

export default HTMLMoment;
