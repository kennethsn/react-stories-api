import {
  action,
  computed,
  makeObservable,
  observable,
  override,
} from 'mobx';

import type { Award, AwardsMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import CardsBaseMomentStore from './cardsBaseMomentStore';

export default class AwardsMomentStore extends CardsBaseMomentStore<AwardsMomentData, Award> {
  selectedAward: Award | null = null;

  isModalOpen = false;

  constructor(moments: MomentsStore, moment: Moment<AwardsMomentData>) {
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

  get isMobile() {
    return this.root.theme.getIsMobile(false);
  }

  get items(): Award[] {
    return this.data?.awards ?? [];
  }

  get layout() {
    const baseLayout = this.data.layout || 'orbit';

    if (this.isMobile && baseLayout === 'orbit') {
      return 'carousel';
    }

    return baseLayout;
  }

  get layoutOptions() {
    const baseOptions = this.data.layout_options ?? {};

    if (this.root.theme.getIsMobile(false)) {
      return {
        ...baseOptions,
        slides_per_view: 1,
        slide_gap: 8,
        show_navigation: true,
        show_pagination: false,
      };
    }

    return baseOptions;
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

  static build(moments: MomentsStore, moment: Moment<AwardsMomentData>) {
    return new AwardsMomentStore(moments, moment);
  }
}
