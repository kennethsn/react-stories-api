import { makeAutoObservable, runInAction, toJS } from 'mobx';
import type { ReactNode } from 'react';

import type {
  Button,
  GoToMomentOptions,
  Moment,
  MutableStory,
  SaveStatus,
  Story,
} from '../types';
import { openJSON } from '../utils/url';
import MomentsStore from './momentsStore';
import type RootStore from './rootStore';

export type EditableStoryKeys = 'description' | 'image' | 'label';
export type StoryStoreOptions = {
  readonly branding?: ReactNode;
  readonly connectRouter?: boolean;
  readonly defaultMomentId?: Moment['id'];
  readonly editable?: boolean;
  readonly fullscreen?: boolean;
  readonly layout?: 'desktop' | 'mobile';
  readonly onChange?: (moment: Moment) => void;
  readonly onSave?: (story: Story) => Promise<void>;
  readonly story: Story;
};

export default class StoryStore {
  private initialStory: Story;

  isEditable: boolean;

  isEdited: boolean = false;

  moments: MomentsStore;

  resetKey = 0; // controls re-render when reset button is hit

  saveStatus?: SaveStatus;

  story: MutableStory;

  constructor(public root: RootStore, public options: StoryStoreOptions) {
    makeAutoObservable(this);
    this.initialStory = options.story;
    this.isEditable = !!options.editable;
    this.options = options;
    this.story = { ...options.story };
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

  get description() {
    return this.story.description;
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

  get shouldConnectRouter() {
    return !!this.options.connectRouter;
  }

  get shouldShowActions() {
    return this.isPlaying || this.isDownloadable || this.isSavable;
  }

  download() {
    const json = this.toJSON();
    openJSON(json);
  }

  emitChangeEvent(moment: Moment) {
    this.options.onChange?.(moment);
  }

  getField(field: EditableStoryKeys) {
    return this.story[field] ?? '';
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

  reset() {
    this.story = { ...this.initialStory };
    this.moments.reset();
    this.isEdited = false;
    this.resetKey += 1;
  }

  async save() {
    this.saveStatus = 'SAVING';
    const story = this.toJSON();
    await this.options.onSave?.(story);
    runInAction(() => {
      this.saveStatus = 'SUCCESS';
      this.isEdited = false;
    });
  }

  pause() {
    this.av.pause();
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

  updateField(field: EditableStoryKeys, value: string) {
    runInAction(() => {
      this.story[field] = value;
      this.onEdit();
    });
  }
}
