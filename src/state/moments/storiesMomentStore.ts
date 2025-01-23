import { computed, makeObservable } from 'mobx';

import type { Moment, StoriesMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class StoriesMomentStore extends CardsBaseMomentStore<StoriesMomentData> {
  constructor(moments: MomentsStore, moment: Moment<StoriesMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      stories: computed,
    });
  }

  get stories() {
    return this.data.stories;
  }

  static build(moments: MomentsStore, moment: Moment<StoriesMomentData>) {
    return new StoriesMomentStore(moments, moment);
  }
}
