import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import styles from './AwardModal.styles';
import { AwardModalProps } from './AwardModal.types';

const AwardModal = observer(({ moment }: AwardModalProps) => {
  const award = moment.selectedAward;

  if (!award) return null;

  const handleCloseModal = () => {
    moment.closeModal();
  };

  return (
    <Modal onClose={handleCloseModal} open={moment.isModalOpen}>
      <Box sx={(theme) => styles.modalBoxRoot(theme)}>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography gutterBottom variant="h5">
          {award.label}
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          {award.subtitle}
        </Typography>

        <Typography variant="body2">{award.description}</Typography>

        <Typography sx={{ fontStyle: 'italic', mt: 1 }} variant="body2">
          Conferred by:
          {' '}

          {award.conferred_by?.title}
        </Typography>

        {award.website ? (
          <a href={award.website} rel="noopener noreferrer" target="_blank">
            <button className="learn-more-button" type="button">
              Learn More
            </button>
          </a>
        ) : null}
      </Box>
    </Modal>
  );
});

export default AwardModal;
