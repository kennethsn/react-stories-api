import { observer } from 'mobx-react-lite';

import StoriesMomentStore from '../../../state/moments/storiesMomentStore';
import StoryCards from '../../StoryCards/StoryCards';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import styles from './StoriesMoment.styles';
import type { StoriesMomentProps } from './StoriesMoment.types';

const StoriesMoment = observer(({ moment, ...props }: StoriesMomentProps) => (
  <CardsBaseMoment<StoriesMomentStore>
    moment={moment}
      // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {StoryCards({
      array: true,
      cardSx: styles.card,
      stories: moment.items,
      layoutOptions: {
        autoplay: true,
      },
    })}
  </CardsBaseMoment>
));

export default StoriesMoment;
