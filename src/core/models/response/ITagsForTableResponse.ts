export interface IGetAllTagsForTable {
    TotalRecords: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    TagsForTable: Array<ITagForTable>;
}

export interface ITagForTable {
    Id: number;
    Name: string;
    Description: string;
}