import { observer } from 'mobx-react-lite';

import VideoMoment from '../VideoMoment/VideoMoment';
import type { YouTubeMomentProps } from './YouTubeMoment.types';

const YouTubeMoment = observer(({ moment }: YouTubeMomentProps) => (
  <VideoMoment moment={moment} />
));

export default YouTubeMoment;
