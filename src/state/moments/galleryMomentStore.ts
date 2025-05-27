import { computed, makeObservable, override } from 'mobx';

import type { GalleryMomentData, Image, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class GalleryMomentStore extends CardsBaseMomentStore<GalleryMomentData, Image> {
  constructor(moments: MomentsStore, moment: Moment<GalleryMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      activeImageUrl: computed,
      items: override,
    });
  }

  get activeImageUrl() {
    return this.activeItem?.url || '';
  }

  get items() {
    return this.moment.data.images;
  }

  static build(moments: MomentsStore, moment: Moment<GalleryMomentData>) {
    return new GalleryMomentStore(moments, moment);
  }
}
