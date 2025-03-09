import { makeAutoObservable } from 'mobx';

import { getFormattedStringValues } from '../utils';
import { setPageTitle } from '../utils/dom';
import { stripTrailingSlash } from '../utils/url';
import type RootStore from './rootStore';

export default class DOMStore {
  document = document;

  window = window;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  getRouteParams(formatterString: string) {
    const path = stripTrailingSlash(this.window.location.pathname);
    const template = stripTrailingSlash(formatterString);
    return getFormattedStringValues(path, template);
  }

  updatePageTitle(title: string) {
    setPageTitle(this.document, title);
  }
}
