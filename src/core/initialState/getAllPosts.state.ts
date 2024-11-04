import { IGetAllPosts } from "../models/response/IPostsResponse";

export const getAllPostsState: IGetAllPosts = {
    TotalRecords: 0,
    TotalPages: 0,
    CurrentPage: 0,
    PageSize: 0,
    Posts: [],
    CategoryDescription: "",
    TagDescription: ""
}