import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';

import { deepMerge } from '../../../utils';
import styles from './Book.styles';
import type { BookProps } from './Book.types';
import BookCover from './BookCover';

const Book = observer(({
  accentColor,
  coverColor,
  author,
  onClick,
  subtitle,
  textColor,
  title,
  sx,
}: BookProps) => (
  <Box
    onClick={onClick}
    role="button"
    sx={deepMerge(styles.root, sx)}
    tabIndex={0}
  >
    <BookCover
      accentColor={accentColor}
      author={author}
      coverColor={coverColor}
      subtitle={subtitle}
      textColor={textColor}
      title={title}
    />

  </Box>
));

export default Book;
