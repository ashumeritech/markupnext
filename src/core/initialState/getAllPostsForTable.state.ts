import { IGetAllPostsForTable } from "../models/response/IPostsForTableResponse";

export const getAllPostsForTableState: IGetAllPostsForTable = {
    TotalRecords: 0,
    TotalPages: 0,
    CurrentPage: 0,
    PageSize: 0,
    PostsForTable: []
}