import { makeObservable, override } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { Moment, PDFMomentData } from '../../types';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class PDFMomentStore extends IFrameMomentStore<PDFMomentData> {
  constructor(moments: MomentsStore, moment: Moment<PDFMomentData>) {
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
    return this.data.url;
  }

  static build(moments: MomentsStore, moment: Moment<PDFMomentData>) {
    return new PDFMomentStore(moments, moment);
  }
}
