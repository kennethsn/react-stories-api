import type { AV, Moment, Story } from '../types';

export const buildVideoAV = (
  storyId: Story['id'],
  moment: Moment,
  setIsPlaying: (isPlaying: boolean) => void,
): AV => ({
  momentIndex: moment.index,
  pause: () => setIsPlaying(false),
  play: () => setIsPlaying(true),
  storyId,
  type: 'video',
});

export default { buildVideoAV };
