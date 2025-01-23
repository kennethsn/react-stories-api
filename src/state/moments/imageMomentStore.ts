import { computed, makeObservable } from 'mobx';

import type { ImageMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class ImageMomentStore extends MomentStore<ImageMomentData> {
  constructor(moments: MomentsStore, moment: Moment<ImageMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      alt: computed,
      fit: computed,
      fitIsCard: computed,
      fitIsCover: computed,
      image: computed,
      position: computed,
      size: computed,
      url: computed,
    });
  }

  get alt() {
    return this.title ?? this.label;
  }

  get fit() {
    return this.image.fit ?? 'card';
  }

  get fitIsCard() {
    return this.fit === 'card';
  }

  get fitIsCover() {
    return this.fit === 'cover';
  }

  get image() {
    return this.data.image;
  }

  get position() {
    return this.image.position ?? 'center';
  }

  get size() {
    return this.image.size;
  }

  get url() {
    return this.image.url;
  }

  static build(moments: MomentsStore, moment: Moment<ImageMomentData>) {
    return new ImageMomentStore(moments, moment);
  }
}
