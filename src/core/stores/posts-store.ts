'use client'
import { action, computed, makeObservable, observable } from "mobx";
import { IAddPost } from "../../models/IAddPost";
import { getAllPostsState } from "../initialState/getAllPosts.state";
import { IPostState } from "../models/state/IPostState";
import UrlConstants from "../../constants/url.constant";
import * as services from "../service/service";
import { IGetAllPosts } from "../models/response/IPostsResponse";
import IApiResponse from "../models/response/IApiResponse";
import { ISinglePost } from "../models/response/ISinglePostResponse";
import { getSinglePostState } from "../initialState/getSinglePost.state";
import { getPostForEditState } from "../initialState/getPostForEdit.state";
import { IPostForEditResponse } from "../models/response/IPostForEditResponse";
import { addPostState } from "../initialState/addPost.state";
import { getAllPostsForTableState } from "../initialState/getAllPostsForTable.state";
import { IGetAllPostsForTable } from "../models/response/IPostsForTableResponse";
import { initialPageLimit } from "../../constants/pageLimitOptions.constant";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class PostsStore implements IPostState {
  postsData = getAllPostsState;
  inProgress = false;
  error = "";

  addPostError = "";
  addPostInProgress = false;
  addPostSuccess = false;

  singlePost = getSinglePostState;
  singlePostInProgress = false;
  singlePostError = "";

  singlePostForEdit = getPostForEditState;
  singlePostForEditInProgress = false;
  singlePostForEditError = "";

  deletePostError = "";
  deletePostInProgress = false;
  deletePostSuccess = false;

  postsDataForTable = getAllPostsForTableState;
  postsDataForTableError = "";
  postsDataForTableInProgress = false;

  currentPageInfo = 1;
  searchText = "";
  constructor() {
    makeObservable(this, {
      inProgress: observable,
      error: observable,
      postsData: observable,
      addPostError: observable,
      addPostInProgress: observable,
      addPostSuccess: observable,
      singlePost: observable,
      singlePostError: observable,
      singlePostInProgress: observable,
      singlePostForEditError: observable,
      singlePostForEditInProgress: observable,
      singlePostForEdit: observable,
      deletePostError: observable,
      deletePostInProgress: observable,
      deletePostSuccess: observable,
      postsDataForTable: observable,
      postsDataForTableError: observable,
      postsDataForTableInProgress: observable,
      searchText: observable,
      getAllPosts: action,
      getPostByTitle: action,
      getPostByTitleForEdit: action,
      addPost: action,
      deletePost: action,
      reset: action,
      resetGetSinglePost: action,
      resetAddPost: action,
      resetDeletePost: action,
      resetGetPostForEdit: action,
      getAllPostsForTable: action,
      resetGetAllPostsForTable: action,
      setCurrentPageInfo: action,
      allPosts: computed,
      getSinglePost: computed,
      getCategoryDescription: computed,
      getPostForEditDetail: computed,
      allPostsForTable: computed,
    });
  }

  getAllPosts = (
    currentPage: number,
    pagerSize: number,
    searchText: string,
    categoryName: string = "",
    tagName: string = ""
  ) => {
    this.inProgress = true;
    const url = `${UrlConstants.Posts}?pageNo=${this.currentPageInfo}&pageSize=${pagerSize}&searchText=${searchText}&categoryName=${categoryName}&tagName=${tagName}`;
    this.searchText = searchText;
    return services
      .get(url)
      .then((response: IApiResponse<IGetAllPosts>) => {
        this.postsData = response.data;
      })
      .catch((err: string) => {
        this.error = err;
      })
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  };

  setCurrentPageInfo =(page:number)=>{
    this.currentPageInfo=page
  }

  getPostByTitle = (title: string) => {
    this.singlePostInProgress = true;
    const url = `${UrlConstants.PostByTitle}/${title}`;

    return services
      .get(url)
      .then((response: IApiResponse<ISinglePost>) => {
        this.singlePost = response.data;
      })
      .catch((err: string) => {
        this.singlePostError = err;
      })
      .finally(
        action(() => {
          this.singlePostInProgress = false;
        })
      );
  };

  addPost = (data: IAddPost, title: string) => {
    this.addPostInProgress = true;
    const image: any = data.Image;
    let fileData = new FormData();

    if (image) fileData.append("Image", image);
    if (image.name.includes("http://localhost:7001/"))
      fileData.append(
        "ImageUrl",
        image.name.replace("http://localhost:7001/", "")
      );
    fileData.append("Title", data.Title);
    fileData.append("Id", data.Id.toString());
    fileData.append("Description", data.Description);
    fileData.append("HtmlCode", data.HtmlCode);
    fileData.append("CssCode", data.CssCode);
    fileData.append("JsCode", data.JsCode);
    fileData.append("CategoryIds", JSON.stringify(data.CategoryIds));
    if (data.TagIds) fileData.append("TagIds", JSON.stringify(data.TagIds));
    fileData.append("HeadTag", data.HeadTag);

    const url = title.length
      ? `${UrlConstants.Posts}/${title}`
      : UrlConstants.Posts;
    const method = title.length ? services.putUpload : services.postUpload;

    return method(url, fileData)
      .then(() => {
        this.addPostSuccess = true;
      })
      .catch((err: string) => {
        this.addPostError = err;
      })
      .finally(
        action(() => {
          this.addPostInProgress = false;
        })
      );
  };

  getPostByTitleForEdit = (title: string) => {
    this.singlePostForEditInProgress = true;
    const url = `${UrlConstants.PostByTitleForEdit}/${title}`;

    return services
      .get(url)
      .then((response: IApiResponse<IPostForEditResponse>) => {
        this.singlePostForEdit = response.data;
      })
      .catch((err: string) => {
        this.singlePostForEditError = err;
      })
      .finally(
        action(() => {
          this.singlePostForEditInProgress = false;
        })
      );
  };

  deletePost = (ids: number[]) => {
    this.deletePostInProgress = true;
    const url = UrlConstants.Posts;
    return services
      .deleteapi(url, { Ids: ids })
      .then(() => {
        this.deletePostSuccess = true;
      })
      .catch((err: string) => {
        this.deletePostError = err;
      })
      .finally(
        action(() => {
          this.deletePostInProgress = false;
        })
      );
  };

  getAllPostsForTable = (
    currentPage: number,
    pagerSize: number,
    searchText: string
  ) => {
    this.postsDataForTableInProgress = true;
    const url = `${UrlConstants.PostsForTable}?pageNo=${currentPage}&pageSize=${pagerSize}&searchText=${searchText}`;

    return services
      .get(url)
      .then((response: IApiResponse<IGetAllPostsForTable>) => {
        this.postsDataForTable = response.data;
      })
      .catch((err: string) => {
        this.postsDataForTableError = err;
      })
      .finally(
        action(() => {
          this.postsDataForTableInProgress = false;
        })
      );
  };

  reset = () => {
    this.inProgress = false;
    this.error = "";
  };

  resetAddPost = () => {
    this.addPostError = "";
    this.addPostInProgress = false;
    this.addPostSuccess = false;
  };

  resetGetSinglePost = () => {
    this.singlePost = getSinglePostState;
    this.singlePostError = "";
    this.singlePostInProgress = false;
  };

  resetDeletePost = () => {
    this.deletePostError = "";
    this.deletePostInProgress = false;
    this.deletePostSuccess = false;
  };

  resetGetPostForEdit = () => {
    this.singlePostForEditError = "";
    this.singlePostForEditInProgress = false;
  };

  resetGetAllPostsForTable = () => {
    this.postsDataForTableError = "";
    this.postsDataForTableInProgress = false;
    this.resetAddPost();
    this.resetGetSinglePost();
    this.resetDeletePost();
    this.resetGetPostForEdit();
  };

  get allPosts() {
    if (this.postsData?.Posts && this.postsData.Posts?.length > 0) {
      return this.postsData.Posts;
    }
    return [];
  }

  get getCategoryDescription() {
    if (
      this.postsData?.CategoryDescription &&
      this.postsData.CategoryDescription?.length > 0
    ) {
      return this.postsData.CategoryDescription;
    }
    return "";
  }

  get getSinglePost() {
    return { ...this.singlePost };
  }

  get getPostForEditDetail() {
    return {
      ...this.singlePostForEdit,
      CategoryIds: this.singlePostForEdit.CategoryIds.length
        ? this.singlePostForEdit.CategoryIds.split(",").map(Number)
        : [],
      TagIds: this.singlePostForEdit.TagIds.length
        ? this.singlePostForEdit.TagIds.split(",").map(Number)
        : [],
      Image: this.singlePostForEdit.ImageUrl.length
        ? {
            ...addPostState.Image,
            name: `http://localhost:7001/${this.singlePostForEdit.ImageUrl}`,
          }
        : { ...addPostState.Image },
    };
  }

  get allPostsForTable() {
    if (
      this.postsDataForTable?.PostsForTable &&
      this.postsDataForTable.PostsForTable?.length > 0
    ) {
      return this.postsDataForTable.PostsForTable;
    }
    return [];
  }

  get getTagDescription() {
    if (
      this.postsData?.TagDescription &&
      this.postsData.TagDescription?.length > 0
    ) {
      return this.postsData.TagDescription;
    }
    return "";
  }
}

const postsStore = new PostsStore();
export default postsStore;
