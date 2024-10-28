import useAV from '../../hooks/useAV';
import AVPlayPauseButton from '../UI/AVPlayPauseButton/AVPlayPauseButton';
import type { MomentAVPlayPauseButtonProps } from './MomentAVPlayPauseButton.types';

export default function MomentAVPlayPauseButton({
  av,
  sx,
}: MomentAVPlayPauseButtonProps) {
  const { isPlaying, pause, play } = useAV(av);
  const handleClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  return (
    <AVPlayPauseButton
      isPlaying={isPlaying}
      onClick={handleClick}
      sx={sx}
    />
  );
}
