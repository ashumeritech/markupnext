export interface IGetAllPostsForTable {
    TotalRecords: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    PostsForTable: Array<IPostForTable>;
}

export interface IPostForTable {
    Id: number;
    Title: string;
    CategoryName: string;
    TagName: string;
    CreatedDate: string;
}