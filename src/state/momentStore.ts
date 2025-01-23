import {
  action, computed, makeObservable, observable, toJS,
} from 'mobx';

import type { Moment, MomentData, MutableMoment } from '../types';
import { buildNoIcon } from '../utils/iconUtils';
import type MomentsStore from './momentsStore';

export type EditableMomentKeys = 'label' | 'subtitle' | 'title';

export default class MomentStore<T = MomentData> {
  private initialMoment: Moment<T>;

  moment: MutableMoment<T>;

  resetKey = 0; // controls re-render when reset button is hit

  constructor(private moments: MomentsStore, moment: Moment<T>) {
    makeObservable(this, {
      av: computed,
      color: computed,
      data: computed,
      getField: action,
      getRelativeHeight: action,
      group: computed,
      hasIcon: computed,
      hasSubtitle: computed,
      icon: computed,
      id: computed,
      index: computed,
      isActive: computed,
      isEditable: computed,
      isInactive: computed,
      isPlaying: computed,
      label: computed,
      moment: observable,
      story: computed,
      storyId: computed,
      subtitle: computed,
      title: computed,
      type: computed,
      updateField: action,
    });
    this.initialMoment = moment;
    this.moments = moments;
    this.moment = { ...moment };
  }

  get av() {
    return this.moments.root.av;
  }

  get color() {
    return this.moment.color;
  }

  get component() {
    return this.config.component;
  }

  get config() {
    return this.moments.getConfig(this.moment);
  }

  get data() {
    return this.moment.data;
  }

  get group() {
    return this.moment.group;
  }

  get hasIcon() {
    return !!this.icon;
  }

  get hasSubtitle() {
    return !!this.subtitle;
  }

  get icon() {
    return this.moment.icon ?? this.config.icon ?? buildNoIcon();
  }

  get id() {
    return this.moment.id;
  }

  get index() {
    return this.moment.index;
  }

  get isActive() {
    return this.moments.isMomentActive(this.moment);
  }

  get isEditable() {
    return this.story.isEditable;
  }

  get isInactive() {
    return !this.isActive;
  }

  get isPlaying() {
    return this.av.isPlayingAV({
      momentId: this.id,
      storyId: this.storyId,
    });
  }

  get key() {
    return `${this.index}-${this.id}`;
  }

  get label() {
    return this.moment.label;
  }

  get story() {
    return this.moments.story;
  }

  get storyId() {
    return this.story.id;
  }

  get subtitle() {
    return this.moment.subtitle;
  }

  get title() {
    return this.moment.title ?? this.label;
  }

  get type() {
    return this.moment.type;
  }

  getField(field: EditableMomentKeys) {
    return this.moment[field] ?? '';
  }

  getRelativeHeight(value: number, algorithm?: 'absolute' | 'percentage') {
    return this.moments.getRelativeHeight(value, algorithm);
  }

  goTo() {
    return this.moments.goToMoment(this.moment);
  }

  onEdit() {
    this.moments.onEdit();
  }

  reset() {
    this.moment = { ...this.initialMoment };
    this.resetKey += 1;
  }

  toJSON() {
    return toJS(this.moment);
  }

  updateField(field: EditableMomentKeys, value: string) {
    this.moment[field] = value;
    this.onEdit();
  }

  static build(moments: MomentsStore, moment: Moment<MomentData>) {
    return new MomentStore(moments, moment);
  }
}
