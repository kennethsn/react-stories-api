import {
  action,
  computed,
  makeObservable,
  observable,
  toJS,
} from 'mobx';

import type {
  Moment,
  MomentData,
  MomentGroup,
  MutableMoment,
  NullableString,
  SerializableRecord,
} from '../types';
import { buildNoIcon } from '../utils/iconUtils';
import { deepCopy, updateObject } from '../utils/object';
import type MomentsStore from './momentsStore';

export default class MomentStore<T = MomentData> {
  private initialMoment: Moment<T>;

  moment: MutableMoment<T>;

  constructor(private moments: MomentsStore, moment: Moment<T>) {
    makeObservable(this, {
      av: computed,
      caption: computed,
      captionButton: computed,
      captionFit: computed,
      captionIsFullWidth: computed,
      captionIsTop: computed,
      captionPosition: computed,
      color: computed,
      data: computed,
      getField: computed,
      getRelativeHeight: action,
      group: computed,
      groupId: computed,
      hasCaption: computed,
      hasCaptionButton: computed,
      hasCaptionContent: computed,
      hasGroup: computed,
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
    this.initialMoment = deepCopy(moment);
    this.moment = deepCopy(moment);
    this.moments = moments;
  }

  get av() {
    return this.moments.root.av;
  }

  get caption() {
    return this.data.caption;
  }

  get captionButton() {
    return this.caption?.button;
  }

  get captionFit() {
    return this.caption?.fit ?? 'full-width';
  }

  get captionIsFullWidth() {
    return this.captionFit === 'full-width';
  }

  get captionPosition() {
    return this.caption?.position ?? 'bottom';
  }

  get captionIsTop() {
    return this.captionPosition === 'top';
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

  get getField() {
    return <ValueType=NullableString>(fieldPath: string): ValueType => {
      const fields = fieldPath.split('.');
      let current: SerializableRecord = this.moment;

      for (let i = 0; i < fields.length; i += 1) {
        if (!current[fields[i]]) {
          return undefined as ValueType;
        }
        current = current[fields[i]] as SerializableRecord;
      }

      return current as ValueType;
    };
  }

  get group() {
    return this.moment.group;
  }

  get groupId() {
    return this.group?.id;
  }

  get hasCaption() {
    return this.hasCaptionContent || this.hasCaptionButton;
  }

  get hasCaptionButton() {
    return !!this.captionButton;
  }

  get hasCaptionContent() {
    return !!this.caption?.content;
  }

  get hasGroup() {
    return !!this.group;
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

  get isFirst() {
    return this.index === 0;
  }

  get isInactive() {
    return !this.isActive;
  }

  get isLast() {
    return this.id === this.story.moments.lastMoment.id;
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
    this.moment = deepCopy(this.initialMoment);
  }

  toJSON() {
    return toJS(this.moment);
  }

  updateField<IValue=SerializableRecord[keyof SerializableRecord]>(
    fieldPath: string,
    value: IValue,
    isComputed?: boolean,
  ) {
    const object = (isComputed ? this : this.moment) as SerializableRecord;
    updateObject(object, fieldPath, value as SerializableRecord[keyof SerializableRecord]);
    this.onEdit();
    return object;
  }

  updateGroup(group: MomentGroup) {
    this.moment.group = group;
    this.onEdit();
  }

  static build(moments: MomentsStore, moment: Moment<MomentData>) {
    return new MomentStore(moments, moment);
  }
}
