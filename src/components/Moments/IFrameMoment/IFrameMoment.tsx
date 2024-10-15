import Box from '@mui/material/Box';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize } from '../../../constants';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './IFrameMoment.styles';
import type { IFrameMomentProps } from './IFrameMoment.types';

// KSN TODO: Fix Height styling when using a Card with Top/Bottom caption
export default function IFrameMoment({ moment }: IFrameMomentProps) {
  const { data: { iframe: { fit = 'cover', size = maxContentSize, url } } } = moment;
  return (
    <BaseMoment
      contentFit={fit}
      contentSize={size}
      moment={moment}
    >
      <Box
        className="moment-iframe"
        component="iframe"
        src={url}
        sx={styles.iframe}
      />
    </BaseMoment>
  );
}
