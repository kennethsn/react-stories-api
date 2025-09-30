import { observer } from 'mobx-react-lite';

import AwardCertificate from '../../UI/AwardCertificate/AwardCertificate';
import AwardModal from '../../UI/AwardModal/AwardModal';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './AwardMoment.styles';
import type { AwardMomentProps } from './AwardMoment.types';

const AwardMoment = observer(({ moment }: AwardMomentProps) => {
  const awards = moment.data?.awards ?? [];

  return (
    <>
      <CardsBaseMoment
        cardsContainerSx={styles.container}
        moment={moment}
      >
        {awards.map((award) => (
          <AwardCertificate
            key={`award-${award.label}-${award.year ?? 'na'}`}
            award={award}
            moment={moment}
          />
        ))}

      </CardsBaseMoment>

      <AwardModal moment={moment} />
    </>
  );
});

export default AwardMoment;
