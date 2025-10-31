import {
  makeObservable,
  override,
} from 'mobx';

import type { IdBadge, IdBadgeMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class IdBadgeMomentStore extends CardsBaseMomentStore<IdBadgeMomentData, IdBadge> {
  constructor(moments: MomentsStore, moment: Moment<IdBadgeMomentData>) {
    super(moments, moment);

    makeObservable(this, {
      items: override,
      layout: override,
    });
  }

  get items(): IdBadge[] {
    return this.data?.badges ?? [];
  }

  get layout() {
    return this.data.layout || 'zigzag';
  }

  static build(moments: MomentsStore, moment: Moment<IdBadgeMomentData>) {
    return new IdBadgeMomentStore(moments, moment);
  }
}
