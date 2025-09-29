import { makeObservable, override } from 'mobx';

import type { Moment, Stat, StatsMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class StatsMomentStore extends CardsBaseMomentStore< StatsMomentData, Stat> {
  constructor(moments: MomentsStore, moment: Moment<StatsMomentData>) {
    super(moments, moment);

    makeObservable(this, {
      items: override,
    });
  }

  get items() {
    return this.moment.data.stats;
  }

  static build(moments: MomentsStore, moment: Moment<StatsMomentData>) {
    return new StatsMomentStore(moments, moment);
  }
}
