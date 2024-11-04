import { IFile } from "./IFile";

export interface IAddPost {
    Id: number;
    Title: string;
    Description: string;
    HtmlCode: string;
    CssCode: string;
    JsCode: string;
    Image: IFile;
    CategoryIds: Array<number>;
    TagIds?: Array<number>;
    HeadTag: string;
}