import MomentAVPlayPauseButton from '../../MomentAVPlayPauseButton/MomentAVPlayPauseButton';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { AVBaseMomentProps } from './AVBaseMoment.types';

export default function AVBaseMoment({
  moment,
  ...baseProps
}: AVBaseMomentProps) {
  return (
    <BaseMoment
      actions={(
        <MomentAVPlayPauseButton moment={moment} />
      )}
      moment={moment}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...baseProps}
    />
  );
}
