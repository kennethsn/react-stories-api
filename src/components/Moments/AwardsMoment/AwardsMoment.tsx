import { observer } from 'mobx-react-lite';

import AwardCertificate from '../../UI/AwardCertificate/AwardCertificate';
import AwardModal from '../../UI/AwardModal/AwardModal';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './AwardsMoment.styles';
import type { AwardsMomentProps } from './AwardsMoment.types';

const AwardsMoment = observer(({ moment }: AwardsMomentProps) => {
  const awards = moment.data?.awards ?? [];

  return (
    <>
      <CardsBaseMoment
        cardsContainerSx={styles.container}
        moment={moment}
      >
        {awards.map((award) => (
          <AwardCertificate
            key={`award-${award.title}-${award.year ?? 'na'}`}
            award={award}
            moment={moment}
          />
        ))}

      </CardsBaseMoment>

      <AwardModal moment={moment} />
    </>
  );
});

export default AwardsMoment;
