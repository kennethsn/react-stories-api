import Box from '@mui/material/Box';
import { useCallback, useState } from 'react';
import ReactPlayer from 'react-player';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize } from '../../../constants';
import useAV from '../../../hooks/useAV';
import useStory from '../../../hooks/useStory';
import { buildVideoAV } from '../../../utils/videoMomentUtils';
import AVBaseMoment from '../AVBaseMoment/AVBaseMoment';
import styles from './VideoMoment.styles';
import type { VideoMomentProps } from './VideoMoment.types';

export default function VideoMoment({ moment }: VideoMomentProps) {
  const { storyId } = useStory();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const av = buildVideoAV(storyId, moment, setIsPlaying);
  const { pause, play } = useAV(av);
  const {
    fit = 'cover',
    size = maxContentSize,
    show_controls: showControls,
    start_at: startAt,
    url,
  } = moment.data;

  const handleReactPlayerPause = () => isPlaying && pause();
  const handleReactPlayerPlay = () => play();
  const handleReactPlayerReady = useCallback((player: ReactPlayer) => {
    if (!isReady) {
      if (startAt) {
        player.seekTo(startAt);
      }
      setIsReady(true);
    }
  }, [isReady, startAt]);
  return (
    <AVBaseMoment
      av={av}
      contentFit={fit}
      contentSize={size}
      moment={moment}
    >
      <Box sx={styles.root}>
        <ReactPlayer
          controls={showControls}
          height="100%"
          onPause={handleReactPlayerPause}
          onPlay={handleReactPlayerPlay}
          onReady={handleReactPlayerReady}
          playing={isPlaying}
          url={url}
          width="100%"
        />
      </Box>
    </AVBaseMoment>
  );
}
