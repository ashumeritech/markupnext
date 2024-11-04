import { IUrlConstant } from "../models/IUrlConstants";

const UrlConstants: IUrlConstant = {
    Authenticate: '/Authenticate',
    Posts: '/Posts',
    Category: '/Category',
    Tag: '/Tag',
    PostByTitle: '/Posts/GetByTitle',
    PostByTitleForEdit: '/Posts/GetByTitleForEdit',
    PostsForTable: '/Posts/PostsForTable',
    CategoriesForTable: '/Category/CategoriesForTable',
    TagsForTable: '/Tag/TagsForTable'
}

export default UrlConstants;