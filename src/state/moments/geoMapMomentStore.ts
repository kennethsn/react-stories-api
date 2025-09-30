import { computed, makeObservable } from 'mobx';

import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { GeoMapMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class GeoMapMomentStore extends MomentStore<GeoMapMomentData> {
  constructor(moments: MomentsStore, moment: Moment<GeoMapMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      geoMap: computed,
      geoMapData: computed,
      geoMapId: computed,
      fit: computed,
      size: computed,
    });
  }

  get geoMap() {
    return this.story.root.geoMaps.getGeoMap(this.geoMapId);
  }

  get geoMapData() {
    return {
      ...this.data.geo_map,
      id: this.geoMapId,
    };
  }

  get geoMapId() {
    return `${this.storyId}::moment::${this.id}::geo_map`;
  }

  get fit() {
    return this.data.fit ?? 'cover';
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  static build(moments: MomentsStore, moment: Moment<GeoMapMomentData>) {
    return new GeoMapMomentStore(moments, moment);
  }
}
