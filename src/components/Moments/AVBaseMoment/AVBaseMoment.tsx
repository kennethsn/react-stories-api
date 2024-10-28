/* eslint-disable react/jsx-props-no-spreading */
import MomentAVPlayPauseButton from '../../MomentAVPlayPauseButton/MomentAVPlayPauseButton';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { AVBaseMomentProps } from './AVBaseMoment.types';

export default function AVBaseMoment({
  av,
  moment,
  ...baseProps
}: AVBaseMomentProps) {
  return (
    <BaseMoment
      moment={moment}
      title={(
        <>
          {moment.title}

          <MomentAVPlayPauseButton av={av} />
        </>
      )}
      {...baseProps}
    />
  );
}
