import { computed, makeObservable, observable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { Button, CardsBaseMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

type CardsItem<T> = T & {
  caption?: string;
  caption_button?: Button;
};

export default class CardsBaseMomentStore<T, ItemType> extends MomentStore<CardsBaseMomentData<T>> {
  activeItemIndex = 0;

  constructor(
    moments: MomentsStore,
    moment: Moment<CardsBaseMomentData<T>>,
  ) {
    super(moments, moment);
    makeObservable(this, {
      activeCaption: computed,
      activeCaptionButton: computed,
      activeItem: computed,
      activeItemIndex: observable,
      items: computed,
      itemsHaveCaptions: computed,
      disableAnimation: computed,
      fit: computed,
      hasActiveCaption: computed,
      layout: computed,
      shouldShowCaption: computed,
      size: computed,
    });
  }

  get activeCaption() {
    return this.activeItem?.caption || '';
  }

  set activeCaption(value: string) {
    this.updateField(`data.images.${this.activeItemIndex}.caption`, value);
  }

  get activeCaptionButton() {
    return this.activeItem?.caption_button;
  }

  get activeItem() {
    return this.items[this.activeItemIndex];
  }

  // eslint-disable-next-line class-methods-use-this
  get items(): CardsItem<ItemType>[] {
    return [];
  }

  get itemsHaveCaptions() {
    return this.items.some((item) => !!item.caption || !!item.caption_button);
  }

  get disableAnimation() {
    return this.isDefault;
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get hasActiveCaption() {
    return !!this.activeCaption;
  }

  get layout() {
    return this.data.layout || 'grid';
  }

  get shouldShowCaption() {
    return this.hasActiveCaption || !!this.activeCaptionButton;
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  setActiveItemIndex(index: number) {
    this.activeItemIndex = index;
  }
}
