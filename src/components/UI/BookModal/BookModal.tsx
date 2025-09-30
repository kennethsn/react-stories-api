import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import styles from './BookModal.styles';
import type { BookModalProps } from './BookModal.types';

const BookModal = observer(({ moment }: BookModalProps) => {
  const book = moment.selectedBook;

  if (!book) return null;

  const handleCloseModal = () => {
    moment.closeModal();
  };

  return (
    <Modal onClose={handleCloseModal} open>
      <Box sx={styles.content}>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          gutterBottom
          variant="h5"
        >
          {book.label}
        </Typography>

        <Typography
          gutterBottom
          variant="subtitle1"
        >
          {book.instance}
        </Typography>

        <Typography variant="body2">
          {book.author}
        </Typography>

        <Typography variant="body2">
          {book.description}
        </Typography>

        {book.url ? (
          <a
            href={book.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="learn-more-button"
              type="button"
            >
              Learn More
            </button>
          </a>
        ) : null}
      </Box>
    </Modal>
  );
});

export default BookModal;
