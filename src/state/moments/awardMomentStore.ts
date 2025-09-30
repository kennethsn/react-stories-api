import {
  action, computed, makeObservable, observable, override,
} from 'mobx';

import type { Award, AwardMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class AwardMomentStore extends CardsBaseMomentStore<AwardMomentData, Award> {
  selectedAward: Award | null = null;

  isModalOpen = false;

  constructor(moments: MomentsStore, moment: Moment<AwardMomentData>) {
    super(moments, moment);

    makeObservable(this, {
      activeAward: computed,
      awards: computed,
      closeModal: action,
      isModalOpen: observable,
      items: override,
      layout: override,
      openAwardModal: action,
      selectedAward: observable,
    });
  }

  get activeAward(): Award | undefined {
    return this.activeItem;
  }

  get awards(): Award[] {
    return this.moment.data?.awards ?? [];
  }

  get items(): Award[] {
    return this.data?.awards ?? [];
  }

  get layout() {
    return this.data.layout || 'orbit';
  }

  handleSetActiveItemIndex(index: number) {
    this.setActiveItemIndex(index);
  }

  openAwardModal(award: Award) {
    this.selectedAward = award;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedAward = null;
    this.isModalOpen = false;
  }

  static build(moments: MomentsStore, moment: Moment<AwardMomentData>) {
    return new AwardMomentStore(moments, moment);
  }
}
