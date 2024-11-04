import { IAddPost } from "../../models/IAddPost";

export const addPostState: IAddPost = {
    Title: "",
    Description: "",
    HtmlCode: "",
    CssCode: "",
    JsCode: "",
    Image: {
        lastModified: 0,
        name: "",
        size: 0,
        type: ""
    },
    CategoryIds: [],
    TagIds: [],
    HeadTag: "",
    Id: 0
}