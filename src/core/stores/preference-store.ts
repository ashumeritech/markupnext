'use client'
import { action, computed, makeObservable, observable } from "mobx";
import { IPreferenceState } from "../models/state/IPreferenceState";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class PreferenceStore implements IPreferenceState {
  title = "";
  subTitle = "";

  constructor() {
    makeObservable(this, {
      title: observable,
      updateTitle: action,
      updateSubTitle: action,
      getTitle: computed,
      getSubTitle: computed,
    });
  }

  updateTitle = (title: string) => {
    this.title = title;
    document.title = title;
  };

  updateSubTitle = (subTitle: string) => {
    this.subTitle = subTitle;
    // const metaDescription = document.querySelector('meta[name="description"]');
    // if (metaDescription) {
    //   metaDescription.setAttribute('content', subTitle);
    // }
  };

  get getTitle() {
    if (this.title) {
      return this.title;
    }
    return "";
  }
  get getSubTitle() {
    if (this.subTitle) {
      return this.subTitle;
    }
    return "";
  }
}

const preferenceStore = new PreferenceStore();
export default preferenceStore;
