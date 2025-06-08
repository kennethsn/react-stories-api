import { computed, makeObservable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { MarkdownMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class MarkdownMomentStore extends MomentStore<MarkdownMomentData> {
  constructor(moments: MomentsStore, moment: Moment<MarkdownMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      content: computed,
      fit: computed,
      size: computed,
    });
  }

  get content() {
    return this.data.content;
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  static build(moments: MomentsStore, moment: Moment<MarkdownMomentData>) {
    return new MarkdownMomentStore(moments, moment);
  }
}
