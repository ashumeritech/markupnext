'use client'
import { action, computed, makeObservable, observable } from "mobx";
import { IIdName } from "../models/response/IIdName";
import { ITagState } from "../models/state/ITagState";
import { IAddTag } from "../../models/IAddTag";
import UrlConstants from "../../constants/url.constant";
import IApiResponse from "../models/response/IApiResponse";
import * as services from '../service/service';
import { addTagState } from "../initialState/addTag.state";
import { getAllTagsForTableState } from "../initialState/getAllTagsForTable.state";
import { IGetAllTagsForTable } from "../models/response/ITagsForTableResponse";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class TagsStore implements ITagState {
    tagsData: IIdName[] = [];
    inProgress = false;
    error = '';

    addTagInProgress = false;
    addTagSuccess = false;
    addTagError = '';

    tagDetailForEdit = addTagState;
    tagDetailForEditInProgress = false;
    tagDetailForEditError = '';

    deleteTagError = '';
    deleteTagInProgress = false;
    deleteTagSuccess = false;

    tagDataForTable = getAllTagsForTableState;
    tagDataForTableError = '';
    tagDataForTableInProgress = false;

    constructor() {
        makeObservable(this, {
            inProgress: observable,
            error: observable,
            tagsData: observable,
            addTagError: observable,
            addTagInProgress: observable,
            addTagSuccess: observable,
            tagDetailForEdit: observable,
            tagDetailForEditInProgress: observable,
            tagDetailForEditError: observable,
            deleteTagError: observable,
            deleteTagInProgress: observable,
            deleteTagSuccess: observable,
            tagDataForTable: observable,
            tagDataForTableError: observable,
            tagDataForTableInProgress: observable,
            getAllTags: action,
            addTag: action,
            getAllTagsForTable: action,
            getTagByNameForEdit: action,
            deleteTag: action,
            reset: action,
            resetAddTag: action,
            resetDeleteTag: action,
            resetGetAllTagsForTable: action,
            resetGetTagForEdit: action,
            allTags: computed,
            getTagForEditDetail: computed,
            allTagsForTable: computed
        })
    }

    getAllTags = () => {
        this.inProgress = true;
        const url = UrlConstants.Tag;

        return services.get(url)
            .then((response: IApiResponse<Array<IIdName>>) => {
                this.tagsData = response.data;
            })
            .catch((err: string) => {
                this.error = err;
            })
            .finally(action(() => { this.inProgress = false; }));
    }

    addTag = (data: IAddTag, name: string) => {
        this.addTagInProgress = true;
        
        const url = name.length ? `${UrlConstants.Tag}/${name}` : UrlConstants.Tag;
        const method = name.length ? services.put : services.post;
        
        return method(url, data)
            .then(() => {
                this.addTagSuccess = true;
            })
            .catch((err: string) => {
                this.addTagError = err;
            })
            .finally(action(() => { this.addTagInProgress = false; }))
    };

    getTagByNameForEdit = (name: string) => {
        this.tagDetailForEditInProgress = true;
        const url = `${UrlConstants.Tag}/${name}`;

        return services.get(url)
            .then((response: IApiResponse<IAddTag>) => {
                this.tagDetailForEdit = response.data;
            })
            .catch((err: string) => {
                this.tagDetailForEditError = err;
            }).finally(action(() => { this.tagDetailForEditInProgress = false; }));
    }

    deleteTag = (ids: number[]) => {
        this.deleteTagInProgress = true;
        const url = UrlConstants.Tag;

        return services.deleteapi(url, { Ids: ids })
            .then(() => {
                this.deleteTagSuccess = true;
            })
            .catch((err: string) => {
                this.deleteTagError = err;
            }).finally(action(() => { this.deleteTagInProgress = false; }));
    }

    getAllTagsForTable = (currentPage: number, pagerSize: number, searchText: string) => {
        this.tagDataForTableInProgress = true;
        const url = `${UrlConstants.TagsForTable}?pageNo=${currentPage}&pageSize=${pagerSize}&searchText=${searchText}`;

        return services.get(url)
            .then((response: IApiResponse<IGetAllTagsForTable>) => {
                this.tagDataForTable = response.data;
            })
            .catch((err: string) => {
                this.tagDataForTableError = err;
            })
            .finally(action(() => { this.tagDataForTableInProgress = false; }));
    }

    reset = () => {
        this.inProgress = false;
        this.error = '';
        this.resetAddTag();
    }

    resetAddTag = () => {
        this.addTagError = '';
        this.addTagInProgress = false;
        this.addTagSuccess = false;
    }

    resetDeleteTag = () => {
        this.deleteTagError = '';
        this.deleteTagInProgress = false;
        this.deleteTagSuccess = false;
    }

    resetGetTagForEdit = () => {
        this.tagDetailForEditError = '';
        this.tagDetailForEditInProgress = false;
    }

    resetGetAllTagsForTable = () => {
        this.tagDataForTableError = '';
        this.tagDataForTableInProgress = false;
        this.resetAddTag();
        this.resetGetTagForEdit();
        this.resetDeleteTag();
    }

    get allTags() {
        if (this.tagsData && this.tagsData.length > 0) {
            return this.tagsData;
        }
        return [];
    }

    get getTagForEditDetail() {
        return { ...this.tagDetailForEdit }
    }

    get allTagsForTable() {
        if (this.tagDataForTable?.TagsForTable && this.tagDataForTable.TagsForTable?.length > 0) {
            return this.tagDataForTable.TagsForTable;
        }
        return [];
    }
}

const tagsStore = new TagsStore();
export default tagsStore;