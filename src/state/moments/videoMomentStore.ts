import {
  action,
  computed,
  makeObservable,
  observable,
  override,
} from 'mobx';
import ReactPlayer from 'react-player';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE as maxContentSize } from '../../constants';
import type { Moment, VideoMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import AVBaseMomentStore from './avBaseMomentStore';

export default class VideoMomentStore<T=VideoMomentData>
  extends AVBaseMomentStore<VideoMomentData> {
  videoPlayer?: ReactPlayer;

  videoIsPlaying = false;

  constructor(moments: MomentsStore, moment: Moment<T>) {
    super(moments, moment as Moment<VideoMomentData>);
    makeObservable(this, {
      fit: computed,
      hasStartAt: computed,
      loadVideoPlayer: action,
      pause: override,
      play: override,
      setVideoPlayer: action,
      showControls: computed,
      size: computed,
      startAt: computed,
      videoIsPlaying: observable,
      videoPlayer: observable,
      url: computed,
    });
  }

  get fit() {
    return this.data.fit ?? 'cover';
  }

  get hasStartAt() {
    return !!this.startAt && this.startAt > 0;
  }

  get showControls() {
    return this.data.show_controls;
  }

  get size() {
    return this.data.size ?? maxContentSize;
  }

  get startAt() {
    return this.data.start_at;
  }

  get url() {
    return this.data.url;
  }

  loadVideoPlayer(player: ReactPlayer) {
    if (this.videoPlayer) {
      return;
    }
    this.setVideoPlayer(player);
    if (this.hasStartAt) {
      this.videoPlayer!.seekTo(this.startAt!);
    }
  }

  pause() {
    this.videoIsPlaying = false;
  }

  play() {
    this.videoIsPlaying = true;
  }

  setVideoPlayer(player: ReactPlayer) {
    this.videoPlayer = player;
  }

  static build(moments: MomentsStore, moment: Moment<VideoMomentData>) {
    return new VideoMomentStore(moments, moment);
  }
}
