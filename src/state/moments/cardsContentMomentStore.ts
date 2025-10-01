import { computed, makeObservable } from 'mobx';

import type { CardsContentMomentData, Content, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class CardsContentMomentStore
  extends CardsBaseMomentStore<CardsContentMomentData, Content> {
  constructor(moments: MomentsStore, moment: Moment<CardsContentMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      cards: computed,
      gridColumnsMax: computed,
    });
  }

  get cards() {
    return this.data.cards;
  }

  get gridColumnsMax() {
    return this.data.grid_columns_max;
  }

  static build(moments: MomentsStore, moment: Moment<CardsContentMomentData>) {
    return new CardsContentMomentStore(moments, moment);
  }
}
