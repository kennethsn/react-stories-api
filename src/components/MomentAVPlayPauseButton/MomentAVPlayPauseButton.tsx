import { observer } from 'mobx-react-lite';

import AVPlayPauseButton from '../UI/AVPlayPauseButton/AVPlayPauseButton';
import type { MomentAVPlayPauseButtonProps } from './MomentAVPlayPauseButton.types';

const MomentAVPlayPauseButton = observer(({
  moment,
  sx,
}: MomentAVPlayPauseButtonProps) => {
  const handleClick = () => moment.toggleAV();
  return (
    <AVPlayPauseButton
      isPlaying={moment.isPlaying}
      onClick={handleClick}
      sx={sx}
    />
  );
});

export default MomentAVPlayPauseButton;
