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

const CategoriesTable = () => {
    const { categoryStore } = useStore();
    const { getAllCategoriesForTable, allCategoriesForTable, categoryDataForTableInProgress, categoryDataForTableError,
        resetGetAllCategoriesForTable, categoryDataForTable, deleteCategory, deleteCategoryError, deleteCategorySuccess,
        deleteCategoryInProgress, resetDeleteCategory } = categoryStore;


    const [pageInfo, setPageInfo] = useState<IPageInfo>({
        currentPage: 1,
        totalPages: 1
    });

    const router = useRouter()

    const [disablePagination, setDisablePagination] = useState<boolean>(false);
    const [searchText, setSearchText] = useState('');
    const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);

    const callGetAllCategoriesService = useCallback(() => {
        setDisablePagination(true);
        getAllCategoriesForTable(pageInfo.currentPage, pageLimit, searchText);
    }, [getAllCategoriesForTable, pageInfo.currentPage, pageLimit, searchText]);

    useEffect(() => {
        callGetAllCategoriesService();
    }, [callGetAllCategoriesService]);

    useEffect(() => {
        setPageInfo(pageInfo => ({ ...pageInfo, totalPages: categoryDataForTable?.TotalPages }));
        setDisablePagination(false);
    }, [allCategoriesForTable, categoryDataForTable.TotalPages]);

    useEffect(() => {
        if (categoryDataForTableError) {
            toast.error(categoryDataForTableError);
            resetGetAllCategoriesForTable();
        }
    }, [categoryDataForTableError, resetGetAllCategoriesForTable]);

    const onPageChanged = useCallback((pageNumber: number) => {
        setPageInfo(pageInfo => ({ ...pageInfo, currentPage: pageNumber }));
    }, []);

    useEffect(() => {
        onPageChanged(1);
    }, [pageLimit, onPageChanged])

    const totalPages = pageInfo.totalPages > 0 ? pageInfo.totalPages : 1;

    const onSearchTextChanged = (text: string) => { setSearchText(text) };

    const categoriesHeaderNames = ['Name', 'Description', 'Number of Posts'];
    const categoriesAccessors = ['Name', 'Description', 'Id'];

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editCategoryHandler = (name: string) => {
        router.push(`/editCategory/${getTrimmedName(name)}`);
    }

    const viewCategoryHandler = (name: string) => {
        router.push(`/category/${getTrimmedName(name)}`);
    }

    const deleteCategoryHandler = (ids: number[]) => {
        setShowDeleteModal(true);
        setSelectedIds(ids);
    }

    useEffect(() => {
        if (deleteCategorySuccess) {
            toast.success("Category(s) deleted successfully.");
            resetDeleteCategory();
            callGetAllCategoriesService();
            setShowDeleteModal(false);
            setSelectedIds([]);
        }
    }, [deleteCategorySuccess, resetDeleteCategory, callGetAllCategoriesService]);

    useEffect(() => {
        if (deleteCategoryError) {
            toast.error("Failed to delete category.");
            resetDeleteCategory();
        }
    }, [deleteCategoryError, resetDeleteCategory]);

    const icons: IIcon[] = [
        {
            icon: 'pencil-square fs-6 text-primary',
            title: 'Edit Category',
            handler: (item: any) => { editCategoryHandler(item.Name); }
        },
        {
            icon: 'trash fs-6 text-primary',
            title: 'Delete Category',
            handler: (item: any) => { deleteCategoryHandler([item.Id]); },
        },
        {
            icon: 'eye fs-6 text-primary',
            title: 'View Tag',
            handler: (item: any) => { viewCategoryHandler(item.Name); }
        }
    ]

    const headerIcons: IIcon[] = [
        {
            icon: 'trash fs-6 text-primary',
            title: 'Delete Category',
            handler: () => { deleteCategoryHandler(selectedIds); },
            isHeaderIconDisabled: !selectedIds.length
        },
    ]

    return <>
        <DashboardHeader />
        <DashboardLeftSidebar />
        <div id="dashboard">
            <div className="row">
                {showDeleteModal && <DeletePopup
                    message="Are you sure you want to Delete Category?"
                    submitHandler={() => deleteCategory(selectedIds)}
                    closeHandler={() => setShowDeleteModal(false)}
                    submitLoading={deleteCategoryInProgress}
                />}
                <div className="col-md-10 offset-md-1 bg-white p-4 rounded-4 shadow-sm border">
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-6">
                            <h1 className="fs-4 mb-0">All Categories</h1>
                            Total Number of Posts: {categoryDataForTable.NumberOfCategories}
                        </div>
                        <div className="col-sm-6">
                            <div className="float-end" style={{maxWidth: '500px'}}>
                                <SearchField onSearchTextChanged={onSearchTextChanged} />
                            </div>
                        </div>
                    </div> 
                    {
                        categoryDataForTableInProgress ? <PageLoader /> :
                            <Table
                                headerNames={categoriesHeaderNames}
                                dataAccessors={categoriesAccessors}
                                data={allCategoriesForTable}
                                icons={icons}
                                selectedRows={selectedIds}
                                setSelectedRows={setSelectedIds}
                                headerIcons={headerIcons}
                                customClass="table table-hover" 
                            />
                    }
                    <ul className="pagination float-end">
                        <Pagination onPageChanged={onPageChanged} totalPages={totalPages} currentPage={pageInfo.currentPage} disablePagination={disablePagination} />
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default observer(CategoriesTable);