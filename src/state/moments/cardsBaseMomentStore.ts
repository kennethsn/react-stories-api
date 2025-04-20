import { computed, makeObservable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { CardsBaseMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class CardsBaseMomentStore<T> extends MomentStore<CardsBaseMomentData<T>> {
  constructor(moments: MomentsStore, moment: Moment<CardsBaseMomentData<T>>) {
    super(moments, moment);
    makeObservable(this, {
      fit: computed,
      layout: computed,
      size: computed,
    });
  }

  get disableAnimation() {
    return this.isDefault;
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get layout() {
    return this.data.layout ?? 'grid';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }
}
