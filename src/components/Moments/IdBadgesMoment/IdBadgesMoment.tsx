import { observer } from 'mobx-react-lite';

import IdBadge from '../../UI/IdBadge/IdBadge';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import type { IdBadgeMomentProps } from './IdBadgesMoment.types';

const IdBadgesMoment = observer(({ moment }: IdBadgeMomentProps) => {
  const badges = moment.items ?? [];

  if (badges.length === 0) return null;

  return (
    <CardsBaseMoment
      moment={moment}
    >
      {badges.map((idBadge, index) => (
        <IdBadge
          key={idBadge.content?.id || idBadge.logo?.url || `badge-${index}`}
          // @ts-expect-error -- caption is passed through for the zigzag card layout
          caption={idBadge.caption}
          idBadge={idBadge}
        />
      ))}

    </CardsBaseMoment>
  );
});

export default IdBadgesMoment;
