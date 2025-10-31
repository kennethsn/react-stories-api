import { observer } from 'mobx-react-lite';

import IdBadge from '../../UI/IdBadge/IdBadge';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import type { IdBadgeMomentProps } from './IdBadgeMoment.types';

const IdBadgeMoment = observer(({ moment }: IdBadgeMomentProps) => {
  const badges = moment.items ?? [];

  if (badges.length === 0) return null;

  return (
    <CardsBaseMoment
      moment={moment}
    >
      {badges.map((badge, index) => (
        <IdBadge
          key={badge.content?.id || badge.logo?.url || `badge-${index}`}
          backgroundImage={badge.backgroundImage}
          content={badge.content}
          information={badge.information}
          logo={badge.logo}
        />
      ))}

    </CardsBaseMoment>
  );
});

export default IdBadgeMoment;
