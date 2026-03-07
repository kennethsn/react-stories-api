import { makeObservable, override } from 'mobx';

import type { IdBadge, IdBadgesMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class IdBadgesMomentStore extends CardsBaseMomentStore<IdBadgesMomentData, IdBadge> {
  constructor(moments: MomentsStore, moment: Moment<IdBadgesMomentData>) {
    super(moments, moment);

    makeObservable(this, {
      items: override,
      layout: override,
    });
  }

  get items(): IdBadge[] {
    return this.data?.id_badges ?? [];
  }

  get layout() {
    return this.data.layout || 'zigzag';
  }

  static build(moments: MomentsStore, moment: Moment<IdBadgesMomentData>) {
    return new IdBadgesMomentStore(moments, moment);
  }
}
