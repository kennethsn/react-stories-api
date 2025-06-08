import { computed, makeObservable } from 'mobx';

import type { HTMLMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class HTMLMomentStore extends MomentStore<HTMLMomentData> {
  constructor(moments: MomentsStore, moment: Moment<HTMLMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      content: computed,
    });
  }

  get content() {
    return this.data.content;
  }

  static build(moments: MomentsStore, moment: Moment<HTMLMomentData>) {
    return new HTMLMomentStore(moments, moment);
  }
}
