import {
  action,
  computed,
  makeObservable,
  observable,
  override,
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
      fit: computed,
      setActiveImageIndex: action,
      caption: override,
      url: computed,
    });
  }

  get activeCaption() {
    return this.data.images[this.activeImageIndex]?.caption || '';
  }

  set activeCaption(value: string) {
    // @ts-expect-error - allow edits in story builder
    this.data.images[this.activeImageIndex].caption = value;
  }

  get caption() {
    return this.data.caption;
  }

  get hasActiveCaption() {
    return !!this.activeCaption;
  }

  get hasGalleryCaptions() {
    return this.data.images.some((image) => !!image.caption);
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get size() {
    return this.data.size;
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
