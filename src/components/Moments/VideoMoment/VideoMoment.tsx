import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import ReactPlayer from 'react-player';

import AVBaseMoment from '../AVBaseMoment/AVBaseMoment';
import styles from './VideoMoment.styles';
import type { VideoMomentProps } from './VideoMoment.types';

const VideoMoment = observer(({ moment }: VideoMomentProps) => {
  const handleReactPlayerPause = moment.pauseHandler;
  const handleReactPlayerPlay = () => {
    moment.playHandler();
  };
  const handleReactPlayerReady = (player: ReactPlayer) => moment.loadVideoPlayer(player);
  return (
    <AVBaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Box sx={styles.root}>
        <ReactPlayer
          controls={moment.showControls}
          height="100%"
          onPause={handleReactPlayerPause}
          onPlay={handleReactPlayerPlay}
          onReady={handleReactPlayerReady}
          playing={moment.videoIsPlaying}
          url={moment.url}
          width="100%"
        />
      </Box>
    </AVBaseMoment>
  );
});

export default VideoMoment;
