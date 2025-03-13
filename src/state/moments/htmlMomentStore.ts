import { makeObservable } from 'mobx';

import type { HTMLMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class HTMLMomentStore extends IFrameMomentStore<HTMLMomentData> {
  constructor(moments: MomentsStore, moment: Moment<HTMLMomentData>) {
    super(moments, moment);
    makeObservable(this, {});
  }

  get content() {
    return this.data.content;
  }

  static build(moments: MomentsStore, moment: Moment<HTMLMomentData>) {
    return new HTMLMomentStore(moments, moment);
  }
}
