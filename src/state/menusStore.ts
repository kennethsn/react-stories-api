import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class MenusStore {
  private activeMenuKey?: string;

  private previousMenuKeys: string[] = [];

  constructor(public root: RootStore) {
    makeAutoObservable(this, { root: false });
  }

  close() {
    this.activeMenuKey = this.previousMenuKeys.pop();
  }

  menuIsOpen(key: string) {
    return this.activeMenuKey === key;
  }

  open(key: string, preservePreviousMenu: boolean = false) {
    if (preservePreviousMenu && this.activeMenuKey) {
      this.previousMenuKeys.push(this.activeMenuKey);
    } else {
      this.previousMenuKeys = [];
    }
    this.activeMenuKey = key;
  }
}
