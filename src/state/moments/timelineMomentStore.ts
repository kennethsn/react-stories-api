import { computed, makeObservable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { Moment, TimelineMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class TimelineMomentStore extends MomentStore<TimelineMomentData> {
  constructor(moments: MomentsStore, moment: Moment<TimelineMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      events: computed,
      fit: computed,
      size: computed,
    });
  }

  get events() {
    return this.data.timeline.events;
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  static build(moments: MomentsStore, moment: Moment<TimelineMomentData>) {
    return new TimelineMomentStore(moments, moment);
  }
}
