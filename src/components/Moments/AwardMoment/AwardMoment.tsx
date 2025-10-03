import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import AwardCertificate from '../../UI/AwardCertificate/AwardCertificate';
import AwardModal from '../../UI/AwardModal/AwardModal';
import { Cards } from '../../UI/Cards';
import styles from './AwardMoment.styles';
import type { AwardMomentProps } from './AwardMoment.types';

const AwardMoment = observer(({ moment }: AwardMomentProps) => {
  const awards = moment.data?.awards ?? [];

  return (
    <Box sx={styles.container}>
      <Cards
        layout="orbit"
      >
        {awards.map((award) => (
          <AwardCertificate
            key={`award-${award.label}-${award.year ?? 'na'}`}
            award={award}
            moment={moment}
          />
        ))}
      </Cards>

      <AwardModal moment={moment} />
    </Box>
  );
});

export default AwardMoment;
