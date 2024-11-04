export interface IGetAllPosts {
    TotalRecords: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    Posts: Array<IPost>;
    CategoryDescription: string
    TagDescription: string
}

export interface IPost {
    Id: number;
    Title: string;
    ImageUrl: string;
    CategoryName: string;
    HtmlCode: string;
    CssCode: string;
    JsCode: string;
    HeadTag: string;
}