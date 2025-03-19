import { computed, makeObservable, override } from 'mobx';

import type { Moment, TextMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class TextMomentStore extends MomentStore<TextMomentData> {
  constructor(moments: MomentsStore, moment: Moment<TextMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      caption: override,
      position: computed,
    });
  }

  get caption() {
    return this.data.caption;
  }

  get position() {
    return this.data.caption.position ?? 'center';
  }

  static build(moments: MomentsStore, moment: Moment<TextMomentData>) {
    return new TextMomentStore(moments, moment);
  }
}
