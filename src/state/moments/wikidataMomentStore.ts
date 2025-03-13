import { computed, makeObservable, override } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { Moment, WikidataMomentData } from '../../types';
import { buildWikidataEntityURL } from '../../utils/wikidataUtils';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class WikidataMomentStore extends IFrameMomentStore<WikidataMomentData> {
  constructor(moments: MomentsStore, moment: Moment<WikidataMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      entityId: computed,
      fit: override,
      size: override,
      url: override,
    });
  }

  get entityId() {
    return this.data.entity_id;
  }

  get fit() {
    return this.data.fit ?? 'cover';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  get url() {
    return this.data.url ?? buildWikidataEntityURL(this.entityId!);
  }

  static build(moments: MomentsStore, moment: Moment<WikidataMomentData>) {
    return new WikidataMomentStore(moments, moment);
  }
}
