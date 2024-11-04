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

const TagsTable = () => {
  const { tagsStore } = useStore();
  const {
    getAllTagsForTable,
    allTagsForTable,
    tagDataForTableInProgress,
    tagDataForTableError,
    resetGetAllTagsForTable,
    tagDataForTable,
    deleteTag,
    deleteTagError,
    deleteTagSuccess,
    deleteTagInProgress,
    resetDeleteTag,
  } = tagsStore;

  const router = useRouter()

  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalPages: 1,
  });

  const [disablePagination, setDisablePagination] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);

  const callGetAllTagsService = useCallback(() => {
    setDisablePagination(true);
    getAllTagsForTable(pageInfo.currentPage, pageLimit, searchText);
  }, [getAllTagsForTable, pageInfo.currentPage, pageLimit, searchText]);

  useEffect(() => {
    callGetAllTagsService();
  }, [callGetAllTagsService]);

  useEffect(() => {
    setPageInfo((pageInfo) => ({
      ...pageInfo,
      totalPages: tagDataForTable?.TotalPages,
    }));
    setDisablePagination(false);
  }, [allTagsForTable, tagDataForTable.TotalPages]);

  useEffect(() => {
    if (tagDataForTableError) {
      toast.error(tagDataForTableError);
      resetGetAllTagsForTable();
    }
  }, [tagDataForTableError, resetGetAllTagsForTable]);

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

  const tagsHeaderNames = ["Name", "Description"];
  const tagsAccessors = ["Name", "Description"];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editTagHandler = (name: string) => {
    router.push(`/editTag/${getTrimmedName(name)}`);
  };

  const viewTagHandler = (name: string) => {
    router.push(`/tag/${getTrimmedName(name)}`);
  };

  const deleteTagHandler = (ids: number[]) => {
    setShowDeleteModal(true);
    setSelectedIds(ids);
  };

  useEffect(() => {
    if (deleteTagSuccess) {
      toast.success("Tag(s) deleted successfully.");
      resetDeleteTag();
      callGetAllTagsService();
      setShowDeleteModal(false);
      setSelectedIds([]);
    }
  }, [deleteTagSuccess, resetDeleteTag, callGetAllTagsService]);

  useEffect(() => {
    if (deleteTagError) {
      toast.error("Failed to delete tag.");
      resetDeleteTag();
    }
  }, [deleteTagError, resetDeleteTag]);

  const icons: IIcon[] = [
    {
      icon: "pencil-square fs-6 text-primary",
      title: "Edit Tag",
      handler: (item: any) => {
        editTagHandler(item.Name);
      },
      routeTo: (item: any) => `/editTag/${getTrimmedName(item.Name)}`,
    },
    {
      icon: "trash fs-6 text-primary",
      title: "Delete Tag",
      handler: (item: any) => {
        deleteTagHandler([item.Id]);
      },
    },
    {
      icon: "eye fs-6 text-primary",
      title: "View Tag",
      handler: (item: any) => {
        viewTagHandler(item.Name);
      },
      routeTo: (item: any) => `/tag/${getTrimmedName(item.Name)}`,
    },
  ];

  const headerIcons: IIcon[] = [
    {
      icon: "trash fs-6 text-primary",
      title: "Delete Tag",
      handler: () => {
        deleteTagHandler(selectedIds);
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
                    message="Are you sure you want to Delete Tag?"
                    submitHandler={() => deleteTag(selectedIds)}
                    closeHandler={() => setShowDeleteModal(false)}
                    submitLoading={deleteTagInProgress}
                  />
                )}
                <div className="col-md-12 bg-white p-4 rounded-4 shadow-sm border">
                  <div className="row mb-3 align-items-center">
                    <div className="col-sm-6">
                      <h1 className="fs-4 mb-0">All Tags</h1>
                    </div>
                    <div className="col-sm-6">
                      <div className="float-end" style={{ maxWidth: "500px" }}>
                        <SearchField onSearchTextChanged={onSearchTextChanged} />
                      </div>
                    </div>
                  </div>
                  {tagDataForTableInProgress ? (
                    <PageLoader />
                  ) : (
                    <Table
                      headerNames={tagsHeaderNames}
                      dataAccessors={tagsAccessors}
                      data={allTagsForTable}
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

export default observer(TagsTable);
