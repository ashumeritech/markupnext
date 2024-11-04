'use client'
import { observer } from "mobx-react-lite";
import DashboardHeader from "../../shared/DashboardHeader/DashboardHeader";
import DashboardLeftSidebar from "../../shared/DashboardLeftSidebar/DashboardLeftSidebar";
import { useStore } from "../../contexts/StoreProvider";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IPageInfo } from "../../models/IPageInfo";
import { initialPageLimit } from "../../constants/pageLimitOptions.constant";
import Pagination from "../../shared/Pagination/Pagination";
import SearchField from "../../shared/SearchField/SearchField";
import Table from "../../shared/Table/Table";
import PageLoader from "../../shared/Loader/PageLoader";
import { IIcon } from "../../models/IIcon";
import DeletePopup from "../../shared/Popup/DeletePopup";
import { getTrimmedName } from "../../helpers/links.helper";
import { useRouter } from "next/navigation";

const PostsTable = () => {
  const { postsStore } = useStore();
  const {
    getAllPostsForTable,
    allPostsForTable,
    postsDataForTableInProgress,
    postsDataForTableError,
    resetGetAllPostsForTable,
    postsDataForTable,
    deletePost,
    deletePostError,
    deletePostSuccess,
    deletePostInProgress,
    resetDeletePost,
  } = postsStore;

  const router = useRouter()

  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalPages: 1,
  });

  const [disablePagination, setDisablePagination] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);

  const callGetAllPostsService = useCallback(() => {
    setDisablePagination(true);
    getAllPostsForTable(pageInfo.currentPage, pageLimit, searchText);
  }, [getAllPostsForTable, pageInfo.currentPage, pageLimit, searchText]);

  useEffect(() => {
    callGetAllPostsService();
  }, [callGetAllPostsService]);

  useEffect(() => {
    setPageInfo((pageInfo) => ({
      ...pageInfo,
      totalPages: postsDataForTable?.TotalPages,
    }));
    setDisablePagination(false);
  }, [allPostsForTable, postsDataForTable.TotalPages]);

  useEffect(() => {
    if (postsDataForTableError) {
      toast.error(postsDataForTableError);
      resetGetAllPostsForTable();
    }
  }, [postsDataForTableError, resetGetAllPostsForTable]);

  const onPageChanged = useCallback((pageNumber: number) => {
    setPageInfo((pageInfo) => ({ ...pageInfo, currentPage: pageNumber }));
  }, []);

  useEffect(() => {
    onPageChanged(1);
  }, [pageLimit, onPageChanged]);

  const totalPages = pageInfo.totalPages > 0 ? pageInfo.totalPages : 1;

  const onSearchTextChanged = (text: string) => {
    setSearchText(text);
  };

  const postsHeaderNames = ["Title", "Categories", "Tags", "Created at"];
  const postsAccessors = ["Title", "CategoryName", "TagName", "CreatedDate"];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getTrimmedPostTitle = (title: string) => getTrimmedName(title);

  const editPostHandler = (title: string) => {
    router.push(`/editPost/${getTrimmedPostTitle(title)}`);
  };

  const deletePostHandler = (ids: number[]) => {
    setShowDeleteModal(true);
    setSelectedIds(ids);
  };

  const viewPostHandler = (title: string) => {
    router.push(`/${getTrimmedPostTitle(title)}`);
  };

  useEffect(() => {
    if (deletePostSuccess) {
      toast.success("Post(s) deleted successfully.");
      resetDeletePost();
      callGetAllPostsService();
      setShowDeleteModal(false);
      setSelectedIds([]);
    }
  }, [deletePostSuccess, resetDeletePost, callGetAllPostsService]);

  useEffect(() => {
    if (deletePostError) {
      toast.error("Failed to delete post.");
      resetDeletePost();
    }
  }, [deletePostError, resetDeletePost]);

  const icons: IIcon[] = [
    {
      icon: "pencil-square fs-6 text-primary",
      title: "Edit Post",
      handler: (item: any) => {
        editPostHandler(item.Title);
      },
      routeTo: (item: any) => `/editPost/${getTrimmedPostTitle(item.Title)}`,
    },
    {
      icon: "trash fs-6 text-primary",
      title: "Delete Post",
      handler: (item: any) => {
        deletePostHandler([item.Id]);
      },
    },
    {
      icon: "eye fs-6 text-primary",
      title: "View Post",
      handler: (item: any) => {
        viewPostHandler(item.Title);
      },
      routeTo: (item: any) => `/${getTrimmedPostTitle(item.Title)}`,
    },
  ];

  const headerIcons: IIcon[] = [
    {
      icon: "trash fs-6 text-primary",
      title: "Delete Post",
      handler: () => {
        deletePostHandler(selectedIds);
      },
      isHeaderIconDisabled: !selectedIds.length,
    },
  ];

  return (
    <>
      <div>
        <DashboardHeader />

        <div className="container-fluid">
          <div className="row">
            <div className="col" style={{ maxWidth: '240px' }}>
              <DashboardLeftSidebar />
            </div>
            <div className="col">
              <div id="main-content">
                {showDeleteModal && (
                  <DeletePopup
                    message="Are you sure you want to Delete Post?"
                    submitHandler={() => deletePost(selectedIds)}
                    closeHandler={() => setShowDeleteModal(false)}
                    submitLoading={deletePostInProgress}
                  />
                )}

                <div className="col-md-12 bg-white p-4 rounded-4 shadow-sm border">
                  <div className="row mb-3 align-items-center">
                    <div className="col-sm-6">
                      <h1 className="fs-4 mb-0">All Posts</h1>
                    </div>
                    <div className="col-sm-6">
                      <div className="float-end" style={{ maxWidth: "500px" }}>
                        <SearchField onSearchTextChanged={onSearchTextChanged} />
                      </div>
                    </div>
                  </div>

                  {postsDataForTableInProgress ? (
                    <PageLoader />
                  ) : (
                    <Table
                      headerNames={postsHeaderNames}
                      dataAccessors={postsAccessors}
                      data={allPostsForTable}
                      icons={icons}
                      selectedRows={selectedIds}
                      setSelectedRows={setSelectedIds}
                      headerIcons={headerIcons}
                      customClass="table table-hover"
                    />
                  )}
                  <ul className="pagination">
                    <Pagination
                      onPageChanged={onPageChanged}
                      totalPages={totalPages}
                      currentPage={pageInfo.currentPage}
                      disablePagination={disablePagination}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(PostsTable);
