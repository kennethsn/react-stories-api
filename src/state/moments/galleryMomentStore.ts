import {
  action, computed, makeObservable, observable, override,
} from 'mobx';

import type { GalleryMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class GalleryMomentStore extends MomentStore<GalleryMomentData> {
  activeImageIndex = 0;

  constructor(moments: MomentsStore, moment: Moment<GalleryMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      activeCaption: computed,
      activeImageIndex: observable,
      setActiveImageIndex: action,
      caption: override,
      url: computed,
    });
  }

  get activeCaption() {
    return this.data.images[this.activeImageIndex]?.caption || '';
  }

  get caption() {
    return this.data.caption;
  }

  get url() {
    return this.data.images[this.activeImageIndex]?.url;
  }

  setActiveImageIndex(index: number) {
    this.activeImageIndex = index;
  }

  static build(moments: MomentsStore, moment: Moment<GalleryMomentData>) {
    return new GalleryMomentStore(moments, moment);
  }
}
