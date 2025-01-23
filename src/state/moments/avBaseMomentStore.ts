import { action, computed, makeObservable } from 'mobx';

import type { AVType, Moment, MomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class AVBaseMomentStore<T=MomentData> extends MomentStore<T> {
  avType: AVType = 'video';

  constructor(moments: MomentsStore, moment: Moment<T>) {
    super(moments, moment);
    makeObservable(this, {
      avConfig: computed,
      play: action.bound,
      playHandler: computed,
      pause: action.bound,
      pauseHandler: computed,
      toggleAV: computed,
    });
  }

  get avConfig() {
    return {
      momentId: this.id,
      pause: this.pause,
      play: this.play,
      storyId: this.storyId,
      type: this.avType,
    };
  }

  get playHandler() {
    return this.av.getPlayHandler(this.avConfig);
  }

  get pauseHandler() {
    return this.av.getPauseHandler();
  }

  get toggleAV() {
    return this.av.getToggleHandler(this.avConfig);
  }

  pause() {
    throw new Error(`Method not implemented.: ${this.type}`);
  }

  play() {
    throw new Error(`Method not implemented.: ${this.type}`);
  }
}
