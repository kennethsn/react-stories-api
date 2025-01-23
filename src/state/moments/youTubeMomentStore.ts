import { makeObservable, override } from 'mobx';

import type { Moment, YouTubeMomentData } from '../../types';
import { getYouTubeWatchURL } from '../../utils/youTubeUtils';
import type MomentsStore from '../momentsStore';
import VideoMomentStore from './videoMomentStore';

export default class YouTubeMomentStore extends VideoMomentStore<YouTubeMomentData> {
  constructor(moments: MomentsStore, moment: Moment<YouTubeMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      startAt: override,
      url: override,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get startAt() {
    // startAt is encoded into the url already, see getYouTubeWatchURL
    return undefined;
  }

  static build(moments: MomentsStore, moment: Moment<YouTubeMomentData>) {
    return new YouTubeMomentStore(moments, moment);
  }

  get url() {
    return getYouTubeWatchURL(this.data);
  }
}
