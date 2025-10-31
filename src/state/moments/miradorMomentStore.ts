import { makeObservable, override } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { MiradorMomentData, Moment, MomentContentFit } from '../../types';
import { deepMerge } from '../../utils';
import type MomentsStore from '../momentsStore';
import IFrameMomentStore from './iframeMomentStore';

export default class MiradorMomentStore extends IFrameMomentStore<MiradorMomentData> {
  constructor(moments: MomentsStore, moment: Moment<MiradorMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      fit: override,
      message: override,
      size: override,
      url: override,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get fit(): MomentContentFit {
    return 'cover';
  }

  get message() {
    const { config } = this.data;
    if (!config) return undefined;
    const fullTheme = deepMerge(config.theme, this.muiTheme);
    const theme = {
      palette: fullTheme?.palette,
    };
    return {
      config: {
        ...config,
        theme,
        themes: {
          ...config?.themes,
          light: theme,
        },
      },
      type: 'MIRADOR_CONFIG',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get size() {
    return MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  get url() {
    return this.data.url;
  }

  static build(moments: MomentsStore, moment: Moment<MiradorMomentData>) {
    return new MiradorMomentStore(moments, moment);
  }
}
