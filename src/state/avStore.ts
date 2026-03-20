import { makeAutoObservable, runInAction } from 'mobx';

import type { AV, Moment, Story } from '../types';
import type RootStore from './rootStore';

export default class AVStore {
  private activeMomentId?: Moment['id'];

  private activeStoryId?: Story['id'];

  private isPlaying = false;

  private pauseFn?: () => void | Promise<void>;

  private playFn?: () => void | Promise<void>;

  type?: 'audio' | 'video';

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  get activeAV(): AV | undefined {
    return this.isPlaying ? {
      momentId: this.activeMomentId!,
      pause: this.pauseFn!,
      play: this.playFn!,
      storyId: this.activeStoryId!,
      type: this.type!,
    } : undefined;
  }

  clear() {
    runInAction(() => {
      this.isPlaying = false;
      this.set({} as AV);
    });
  }

  getPauseHandler() {
    return async () => {
      await this.pause();
    };
  }

  getPlayHandler(av: AV) {
    return async () => {
      if (this.isPlayingAV(av)) {
        if (this.root.isDebugging) {
          // eslint-disable-next-line no-console
          console.warn('AV is already playing');
        }
        return;
      }
      await this.pause();
      this.set(av);
      await this.play();
    };
  }

  getToggleHandler(av: AV) {
    return async () => {
      if (this.isPlayingAV(av)) {
        await this.pause();
      } else {
        await this.getPlayHandler(av)();
      }
    };
  }

  isPlayingAV(compareAV: Partial<AV>) {
    const { storyId, momentId } = compareAV;
    if (!this.isPlaying) {
      return false;
    }
    if (storyId && this.activeStoryId !== storyId) {
      return false;
    }
    if (momentId !== undefined && this.activeMomentId !== momentId) {
      return false;
    }
    return true;
  }

  // TODO: add "stop" function to have distinct "stop" and "pause" functions
  async pause() {
    this.setIsPlaying(false);
    if (this.pauseFn) {
      await this.pauseFn();
    }
    this.clear();
  }

  async play() {
    if (this.playFn) {
      await this.playFn();
    }
    this.setIsPlaying(true);
  }

  set(av: AV) {
    runInAction(() => {
      this.activeMomentId = av.momentId;
      this.activeStoryId = av.storyId;
      this.pauseFn = av.pause;
      this.playFn = av.play;
      this.type = av.type;
    });
  }

  setIsPlaying(isPlaying: boolean) {
    runInAction(() => {
      this.isPlaying = isPlaying;
    });
  }
}
