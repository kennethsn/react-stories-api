import { makeAutoObservable, runInAction, toJS } from 'mobx';
import type { FC, ReactNode } from 'react';

import type {
  Button,
  EditableStoryKey,
  GoToMomentOptions,
  Moment,
  MutableStory,
  SaveStatus,
  Story,
} from '../types';
import { deepCopy, objectsAreEqual } from '../utils/object';
import { openJSON } from '../utils/url';
import MomentsStore from './momentsStore';
import type RootStore from './rootStore';

export type StoryStoreOptions = {
  readonly branding?: ReactNode;
  readonly connectRouter?: boolean;
  readonly defaultMomentId?: Moment['id'];
  readonly editable?: boolean;
  readonly fullscreen?: boolean;
  readonly layout?: 'desktop' | 'mobile';
  readonly onChange?: (moment: Moment) => void;
  readonly onSave?: (story: Story) => Promise<void>;
  readonly slots?: { [key: string]: FC };
  readonly story: Story;
};

export default class StoryStore {
  private initialStory: Story;

  isEditable: boolean;

  isEdited: boolean = false;

  moments: MomentsStore;

  saveStatus?: SaveStatus;

  story: MutableStory;

  constructor(public root: RootStore, public options: StoryStoreOptions) {
    makeAutoObservable(this);
    this.initialStory = deepCopy(options.story);
    this.isEditable = !!options.editable;
    this.options = options;
    this.story = deepCopy(options.story);
    this.root = root;
    this.moments = new MomentsStore(this.root, this);
  }

  get av() {
    return this.root.av;
  }

  get avType() {
    return this.av.type;
  }

  get branding() {
    return toJS(this.options.branding);
  }

  get collectionId() {
    return this.story.collection_id;
  }

  get collectionName() {
    return this.story.collection_name;
  }

  get description() {
    return this.story.description;
  }

  get getField() {
    return (field: EditableStoryKey) => this.story[field] ?? '';
  }

  get hasBranding() {
    return !!this.branding;
  }

  get hasDescription() {
    return !!this.description;
  }

  get id() {
    return this.story.id;
  }

  get image() {
    return this.story.image;
  }

  get isDownloadable() {
    return this.isEditable;
  }

  get isFailed() {
    return this.saveStatus === 'FAILED';
  }

  get isFullscreen() {
    return !!this.options.fullscreen;
  }

  get isPlaying() {
    return this.av.isPlayingAV({ storyId: this.id });
  }

  get isResettable() {
    return this.isEdited;
  }

  get isSavable() {
    return this.isEdited;
  }

  get isSaved() {
    return this.saveStatus === 'SUCCESS';
  }

  get isSaving() {
    return this.saveStatus === 'SAVING';
  }

  get label() {
    return this.story.label;
  }

  get saveButtonTitle() {
    return this.isSaved ? 'Story Saved Successfully!' : `Save "${this.label}" Story`;
  }

  get shouldShowActions() {
    return this.isPlaying || this.isDownloadable || this.isSavable;
  }

  get slots() {
    return this.options.slots;
  }

  get status() {
    return this.story.status;
  }

  download() {
    const json = this.toJSON();
    openJSON(json);
  }

  emitChangeEvent(moment: Moment) {
    this.options.onChange?.(moment);
  }

  getSlotComponent(slot: string) {
    return this.slots?.[slot];
  }

  isSlotAvailable(slot: string) {
    return !!this.slots?.[slot];
  }

  isLayoutDesktop(defaultValue = false) {
    return this.options.layout === 'desktop' || defaultValue;
  }

  isLayoutMobile(defaultValue = false) {
    return this.options.layout === 'mobile' || defaultValue;
  }

  isMomentButtonWithinSameStory(button: Button): button is GoToMomentOptions {
    return !button.newTab
    && 'momentId' in button
    && this.collectionId === button.collectionId
    && this.id === button.storyId;
  }

  onEdit() {
    this.isEdited = true;
    this.saveStatus = undefined;
  }

  pause() {
    this.av.pause();
  }

  reset() {
    this.story = deepCopy(this.initialStory);
    this.resetMoments();
    this.isEdited = false;
  }

  resetMoments() {
    this.moments.reset();
  }

  async save() {
    this.saveStatus = 'SAVING';
    const story = this.toJSON();
    try {
      await this.options.onSave?.(story);
      runInAction(() => {
        this.saveStatus = 'SUCCESS';
        this.isEdited = false;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.saveStatus = 'FAILED';
    }
  }

  setStory(story: Story) {
    if (objectsAreEqual(this.story, story)) {
      return this.story;
    }
    runInAction(() => {
      this.story = story;
      this.resetMoments();
      this.onEdit();
    });
    return this.story;
  }

  toggleIsEditable() {
    this.isEditable = !this.isEditable;
  }

  toJSON() {
    const moments = this.moments.toJSON();
    return toJS({
      ...this.story,
      moments,
    });
  }

  updateField(field: EditableStoryKey, value: never) {
    runInAction(() => {
      this.story[field] = value;
      this.onEdit();
    });
  }

  updatePageTitle() {
    const title = this.root.formatters.formatStoryPageTitle({
      collectionId: this.collectionId,
      collectionName: this.collectionName,
      storyId: this.id,
      storyLabel: this.label,
    });
    this.root.dom.updatePageTitle(title);
  }
}
