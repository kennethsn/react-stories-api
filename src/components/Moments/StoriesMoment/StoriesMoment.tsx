import StoryCards from '../../StoryCards/StoryCards';
import CardsBaseMoment from '../CardsBaseMoment/CardsBaseMoment';
import type { StoriesMomentProps } from './StoriesMoment.types';

export default function StoriesMoment({ moment, ...props }: StoriesMomentProps) {
  const { data: { stories } } = moment;
  return (
    <CardsBaseMoment
      layout="grid"
      moment={moment}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {StoryCards({ array: true, stories })}
    </CardsBaseMoment>
  );
}
