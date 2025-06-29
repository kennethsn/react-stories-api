import {
  action, computed, makeObservable, observable,
} from 'mobx';

import type { BookItem } from '../../components/UI/Bookshelf/Bookshelf.types';
import { MOMENT_LAYOUT_MAX_CONTENT_SIZE } from '../../constants';
import type { LibraryMomentData, Moment } from '../../types';
import type MomentsStore from '../momentsStore';
import MomentStore from '../momentStore';

export default class LibraryMomentStore extends MomentStore<LibraryMomentData> {
  selectedBook: BookItem | null = null;

  isModalOpen = false;

  constructor(moments: MomentsStore, moment: Moment<LibraryMomentData>) {
    super(moments, moment);
    makeObservable(this, {
      closeModal: action,
      fit: computed,
      graphic: computed,
      isModalOpen: observable,
      openBookModal: action,
      onSelect: computed,
      selectedBook: observable,
      shelves: computed,
      size: computed,
    });
  }

  get fit() {
    return this.data.fit ?? 'full';
  }

  get graphic() {
    return this.data.graphic;
  }

  get onSelect() {
    return this.data.onSelect;
  }

  get shelves() {
    return this.data.shelves ?? {};
  }

  get size() {
    return this.data.size ?? MOMENT_LAYOUT_MAX_CONTENT_SIZE;
  }

  openBookModal = (book: BookItem) => {
    this.selectedBook = book;
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.selectedBook = null;
    this.isModalOpen = false;
  };

  static build(moments: MomentsStore, moment: Moment<LibraryMomentData>) {
    return new LibraryMomentStore(moments, moment);
  }
}
