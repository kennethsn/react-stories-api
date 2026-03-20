import { computed, makeObservable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { IFrameMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class IFrameMomentStore<T=IFrameMomentData> extends MomentStore<T> {
  constructor(moments: MomentsStore, moment: Moment<T>) {
    super(moments, moment as Moment<T>);
    makeObservable(this, {
      fit: computed,
      iframe: computed,
      message: computed,
      size: computed,
      url: computed,
    });
  }

  get fit() {
    return this.iframe.fit ?? 'cover';
  }

  get iframe() {
    return (this.data as unknown as Moment<IFrameMomentData>['data']).iframe;
  }

  get message() {
    return this.iframe?.message;
  }

  get size() {
    return this.iframe.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  get url() {
    return this.iframe.url;
  }

  static build(moments: MomentsStore, moment: Moment) {
    return new IFrameMomentStore(moments, moment);
  }
}
