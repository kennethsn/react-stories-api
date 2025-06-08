import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import ReactMarkdown from 'react-markdown';

import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './MarkdownMoment.styles';
import type { MarkdownMomentProps } from './MarkdownMoment.types';

const MarkdownMoment = observer(({ moment }: MarkdownMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    <Box sx={styles.root}>
      <ReactMarkdown>{moment.content}</ReactMarkdown>
    </Box>
  </BaseMoment>
));

export default MarkdownMoment;
