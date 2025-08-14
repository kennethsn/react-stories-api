import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import styles from './Book.styles';
import type { BookProps } from './Book.types';

const BookCover = observer(({
  accentColor,
  coverColor,
  author,
  subtitle,
  textColor,
  title,
}: BookProps) => (
  <Box
    className="BookCover"
    sx={styles.cover(accentColor)}
  >
    <Box sx={styles.content(coverColor, textColor)}>
      <When condition={!!title}>
        <Box sx={styles.title}>
          {title}
        </Box>
      </When>

      <When condition={!!subtitle}>
        <Box sx={styles.subtitle}>
          {subtitle}
        </Box>
      </When>

      <When condition={!!author}>
        <Box sx={styles.author}>
          {author}
        </Box>
      </When>
    </Box>
  </Box>
));

export default BookCover;
