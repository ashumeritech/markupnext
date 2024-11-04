'use client'
import categoryStore, { CategoryStore } from "./category-store";
import postsStore, { PostsStore } from "./posts-store";
import preferenceStore, { PreferenceStore } from "./preference-store";
import tagsStore, { TagsStore } from "./tags-store";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export type RootStore = {
    postsStore: PostsStore;
    categoryStore: CategoryStore;
    tagsStore: TagsStore;
    preferenceStore: PreferenceStore;
}

const rootStore: RootStore = {
    postsStore: postsStore,
    categoryStore: categoryStore,
    tagsStore: tagsStore,
    preferenceStore: preferenceStore
}

export default rootStore;