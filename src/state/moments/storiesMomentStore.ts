import { makeObservable, override } from 'mobx';

import type { Moment, StoriesMomentData, StorySummary } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class StoriesMomentStore
  extends CardsBaseMomentStore<StoriesMomentData, StorySummary> {
  constructor(moments: MomentsStore, moment: Moment<StoriesMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      items: override,
    });
  }

  get items() {
    return this.data.stories;
  }

  static build(moments: MomentsStore, moment: Moment<StoriesMomentData>) {
    return new StoriesMomentStore(moments, moment);
  }
}
