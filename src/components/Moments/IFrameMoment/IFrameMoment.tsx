import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './IFrameMoment.styles';
import type { IFrameMomentProps } from './IFrameMoment.types';

// KSN TODO: Fix Height styling when using a Card with Top/Bottom caption
const IFrameMoment = observer(({ moment }: IFrameMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    <Box
      className="moment-iframe"
      component="iframe"
      src={moment.url}
      sx={styles.iframe}
    />
  </BaseMoment>
));

export default IFrameMoment;
