import { makeObservable, override } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { HathiTrustMomentData, Moment } from '../../types';
import { buildHathiTrustEmbedURL } from '../../utils/hathiTrustUtils';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class HathiTrustMomentStore extends IFrameMomentStore<HathiTrustMomentData> {
  constructor(moments: MomentsStore, moment: Moment<HathiTrustMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      fit: override,
      size: override,
      url: override,
    });
  }

  get fit() {
    return this.data.fit ?? 'cover';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  get url() {
    return buildHathiTrustEmbedURL(this.data);
  }

  static build(moments: MomentsStore, moment: Moment<HathiTrustMomentData>) {
    return new HathiTrustMomentStore(moments, moment);
  }
}
