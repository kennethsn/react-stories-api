import { makeAutoObservable, runInAction, toJS } from 'mobx';
import type { RefObject } from 'react';
import type { SwiperClass } from 'swiper/react';

import type {
  InputMoment,
  Moment,
  MomentGroup,
  MutableMoment,
} from '../types';
import { buildMap, getElementHeight, getRelativeHeight } from '../utils';
import { generateMomentGroupId, groupMoments, processInputMoments } from '../utils/momentUtils';
import type MomentStore from './momentStore';
import type RootStore from './rootStore';
import type StoryStore from './storyStore';

export default class MomentsStore {
  private activeMomentIndex: number = 0;

  private activeMomentRefs: Record<Moment['id'], RefObject<HTMLDivElement> | null> = {};

  private expandedMomentGroups: Set<string> = new Set();

  private inputMoments: InputMoment[] = [];

  moments: MomentStore[] = [];

  private swiper: SwiperClass | undefined;

  constructor(public root: RootStore, public story: StoryStore) {
    makeAutoObservable(this);
    runInAction(() => {
      this.inputMoments = story.story.moments;
      this.story = story;
      this.root = root;
      this.moments = this.buildMoments();
      this.activeMomentIndex = this.defaultMomentIndex ?? 0;
      this.expandedMomentGroups = this.groupMomentsResult.initialExpandedGroups;
    });
  }

  get activeMoment() {
    return this.moments[this.activeMomentIndex];
  }

  // KSN TODO: moment ref height needs to be updated when the moment header is expanded
  get activeMomentHeight() {
    return getElementHeight(this.activeMomentRef);
  }

  get activeMomentId() {
    return this.activeMoment.id;
  }

  get activeMomentRef() {
    return this.activeMomentRefs[this.activeMomentIndex];
  }

  get areEditable() {
    return this.story.isEditable;
  }

  get availableMomentTypes() {
    return new Set(Object.keys(this.configMap));
  }

  get configMap() {
    return this.root.momentConfigMap;
  }

  get defaultMoment() {
    if (this.defaultMomentId) {
      const moment = this.getMoment(this.defaultMomentId);
      if (moment) {
        return moment;
      }
    }
    return this.firstMoment;
  }

  get defaultMomentId() {
    return this.story.options.defaultMomentId;
  }

  get defaultMomentIndex() {
    return this.defaultMoment?.index ?? 0;
  }

  get firstMoment() {
    return this.moments[0];
  }

  get groupedMoments() {
    return this.groupMomentsResult.groupedMoments;
  }

  private get groupMomentsResult() {
    return groupMoments(this.moments);
  }

  private get idMap() {
    return buildMap(this.moments);
  }

  get isOnFirstMoment() {
    return this.activeMomentId === this.firstMoment.id;
  }

  get isOnLastMoment() {
    return this.activeMomentId === this.lastMoment.id;
  }

  get lastMoment() {
    return this.moments[this.moments.length - 1];
  }

  get nextMoment() {
    return this.getMomentAtIndex(this.activeMomentIndex + 1);
  }

  get previousMoment() {
    return this.getMomentAtIndex(this.activeMomentIndex - 1);
  }

  buildMoment(moment: Moment): MomentStore {
    const Store = () => new (this.getMomentStoreClass(moment))(this, moment);
    const momentStore = Store();
    return momentStore;
  }

  buildMoments() {
    const momentsData = processInputMoments(this.inputMoments, this.availableMomentTypes);
    return momentsData.map((moment) => this.buildMoment(moment));
  }

  collapseGroup(groupId: string) {
    this.expandedMomentGroups.delete(groupId);
  }

  emitChangeEvent() {
    this.story.emitChangeEvent(this.activeMoment);
  }

  expandGroup(groupId: string) {
    this.expandedMomentGroups.add(groupId);
  }

  getConfig(moment: Pick<Moment | MutableMoment, 'type'>) {
    const config = this.configMap[moment.type];
    if (!config) {
      // eslint-disable-next-line no-console
      console.warn(`No config found for moment type: ${moment.type}`);
    }
    return config;
  }

  getMoment(id: string) {
    return this.idMap[id];
  }

  getMomentAtIndex(index: number) {
    return this.moments[index];
  }

  getMomentStoreClass(moment: Moment) {
    return this.getConfig(moment).store as unknown as typeof MomentStore;
  }

  getRelativeHeight(value: number, algorithm?: 'absolute' | 'percentage') {
    return getRelativeHeight(this.activeMomentRef, value, algorithm);
  }

  goToBeginning() {
    this.goToMoment(this.firstMoment);
  }

  goToMoment({ index }: Pick<Moment, 'index'>) {
    this.goToMomentIndex(index);
  }

  goToMomentId(id: Moment['id']) {
    const moment = this.getMoment(id);
    this.goToMoment(moment);
  }

  goToMomentIndex(index: number) {
    runInAction(() => {
      this.swiper?.slideTo(index);
      this.setActiveMomentIndex(index);
      const moment = this.moments[index];
      if (moment.group) {
        this.expandGroup(moment.group.id);
      }
      this.emitChangeEvent();
    });
  }

  goToNextMoment() {
    if (this.isOnLastMoment) {
      return this.goToBeginning();
    }

    return this.goToMoment(this.nextMoment);
  }

  goToPreviousMoment() {
    if (this.isOnFirstMoment) {
      return this.goToBeginning();
    }
    return this.goToMoment(this.previousMoment);
  }

  isGroupExpanded(groupId: string) {
    return this.expandedMomentGroups.has(groupId);
  }

  isMomentActive(moment: Pick<Moment | MutableMoment, 'id'>) {
    return moment.id === this.activeMomentId;
  }

  onEdit() {
    this.story.onEdit();
  }

  reset() {
    this.moments = this.buildMoments();
  }

  private setActiveMomentIndex(index: number) {
    this.activeMomentIndex = index;
  }

  setMomentRef(moment: Moment, ref: RefObject<HTMLDivElement>) {
    this.activeMomentRefs[moment.id] = ref;
  }

  setSwiper(swiper: SwiperClass) {
    this.swiper = swiper;
  }

  toggleGroup(groupId: string) {
    if (this.isGroupExpanded(groupId)) {
      this.collapseGroup(groupId);
    } else {
      this.expandGroup(groupId);
    }
  }

  toJSON() {
    return toJS(this.moments.map((moment) => moment.toJSON()));
  }

  updateMomentGroup(groupId: MomentGroup['id'], newLabel: MomentGroup['label']) {
    const newGroup = {
      id: generateMomentGroupId(newLabel),
      label: newLabel,
    };
    this.moments.forEach((moment) => {
      if (moment.groupId === groupId) {
        moment.updateGroup(newGroup);
      }
    });
    this.onEdit();
  }
}
