import { IAddPost } from "../../../models/IAddPost";
import { ISinglePost } from "../response/ISinglePostResponse";
import { IPostForEditResponse } from "../response/IPostForEditResponse";
import { IGetAllPostsForTable, IPostForTable } from "../response/IPostsForTableResponse";
import { IGetAllPosts, IPost } from "../response/IPostsResponse";
import { ICommonState } from "./ICommonState";

export interface IPostState extends ICommonState {
    postsData: IGetAllPosts;

    addPostInProgress: boolean;
    addPostSuccess: boolean;
    addPostError: string;

    deletePostInProgress: boolean;
    deletePostSuccess: boolean;
    deletePostError: string;

    singlePost: ISinglePost;
    singlePostInProgress: boolean;
    singlePostError: string;

    singlePostForEdit: IPostForEditResponse;
    singlePostForEditInProgress: boolean;
    singlePostForEditError: string;

    postsDataForTable: IGetAllPostsForTable;
    postsDataForTableInProgress: boolean;
    postsDataForTableError: string;

    getAllPosts: (currentPage: number, pagerSize: number, searchText: string, categoryName: string, tagName: string) => void;
    getPostByTitle: (title: string) => void;
    addPost: (data: IAddPost, title: string) => void;
    getPostByTitleForEdit: (title: string) => void;
    deletePost: (ids: number[]) => void;
    getAllPostsForTable: (currentPage: number, pagerSize: number, searchText: string) => void;

    reset: () => void;
    resetAddPost: () => void;
    resetGetSinglePost: () => void;
    resetDeletePost: () => void;
    resetGetPostForEdit: () => void;
    resetGetAllPostsForTable: () => void;

    allPosts: Array<IPost>;
    getSinglePost: ISinglePost;
    getCategoryDescription: string;
    getPostForEditDetail: IAddPost;
    allPostsForTable: Array<IPostForTable>;
    getTagDescription: string;
}