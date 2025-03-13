import { computed, makeObservable, override } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { Moment, WikipediaMomentData } from '../../types';
import { buildWikipediaPageURL } from '../../utils/wikipediaUtils';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class WikipediaMomentStore extends IFrameMomentStore<WikipediaMomentData> {
  constructor(moments: MomentsStore, moment: Moment<WikipediaMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      fit: override,
      pageKey: computed,
      size: override,
      url: override,
    });
  }

  get fit() {
    return this.data.fit ?? 'cover';
  }

  get pageKey() {
    return this.data.page_key;
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  get url() {
    return this.data.url ?? buildWikipediaPageURL(this.pageKey!);
  }

  static build(moments: MomentsStore, moment: Moment<WikipediaMomentData>) {
    return new WikipediaMomentStore(moments, moment);
  }
}
