import { EmojiEvents } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { deepMerge } from '../../../utils';
import styles from './AwardCertificate.styles';
import type { AwardCertificateProps } from './AwardCertificates.types';

const AwardCertificate = observer(({ award, moment, sx }: AwardCertificateProps) => {
  const {
    color,
    conferred_by: conferredBy,
    description,
    label,
    name,
    subtitle,
    year,
  } = award;

  const handleAwardClick = () => {
    if (moment?.openAwardModal) {
      moment.openAwardModal(award);
    }
  };

  return (
    <Box onClick={handleAwardClick} sx={deepMerge(styles.root, sx)}>
      <Box sx={styles.corner.topLeft(color.dark)} />

      <Box sx={styles.corner.topRight(color.dark)} />

      <Box sx={styles.corner.bottomLeft(color.dark)} />

      <Box sx={styles.corner.bottomRight(color.dark)} />

      <Box sx={styles.awardIcon(color.dark)}>
        <EmojiEvents fontSize="large" />
      </Box>

      {name ? <Typography sx={styles.name}>{name}</Typography> : null}

      {subtitle ? <Typography sx={styles.subtitle}>{subtitle}</Typography> : null}

      {description ? <Typography sx={styles.description}>{description}</Typography> : null}

      {label ? <Typography sx={styles.label}>{label}</Typography> : null}

      {conferredBy ? (
        <Typography sx={styles.conferredBy}>
          Conferred by
          {' '}

          {conferredBy.title || conferredBy.label}
        </Typography>
      ) : null}

      {year ? <Typography sx={styles.year}>{year}</Typography> : null}
    </Box>
  );
});

export default AwardCertificate;
