import { IAddTag } from "../../../models/IAddTag";
import { IIdName } from "../response/IIdName";
import { IGetAllTagsForTable, ITagForTable } from "../response/ITagsForTableResponse";
import { ICommonState } from "./ICommonState";

export interface ITagState extends ICommonState {
    tagsData: Array<IIdName>;

    addTagInProgress: boolean;
    addTagSuccess: boolean;
    addTagError: string;

    deleteTagInProgress: boolean;
    deleteTagSuccess: boolean;
    deleteTagError: string;

    tagDetailForEdit: IAddTag;
    tagDetailForEditInProgress: boolean;
    tagDetailForEditError: string;

    tagDataForTable: IGetAllTagsForTable;
    tagDataForTableInProgress: boolean;
    tagDataForTableError: string;

    getAllTags: () => void;
    addTag: (data: IAddTag, name: string) => void;
    getTagByNameForEdit: (name: string) => void;
    deleteTag: (ids: number[]) => void;
    getAllTagsForTable: (currentPage: number, pagerSize: number, searchText: string) => void;

    reset: () => void;
    resetAddTag: () => void;
    resetDeleteTag: () => void;
    resetGetTagForEdit: () => void;
    resetGetAllTagsForTable: () => void;
    
    allTags: Array<IIdName>;
    getTagForEditDetail: IAddTag;
    allTagsForTable: Array<ITagForTable>;
}