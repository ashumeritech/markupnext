'use client'
import { action, computed, makeObservable, observable } from "mobx";
import { IAddCategory } from "../../models/IAddCategory";
import { ICategoryState } from "../models/state/ICategoryState";
import UrlConstants from "../../constants/url.constant";
import * as services from '../service/service';
import IApiResponse from "../models/response/IApiResponse";
import { ICategory } from "../models/response/ICategoryResponse";
import { nest } from "../../helpers/arrayToTree.helper";
import { addCategoryState } from "../initialState/addCategory.state";
import { getAllCategoriesForTableState } from "../initialState/getAllCategoriesForTable.state";
import { IGetAllCategoriesForTable } from "../models/response/ICategoriesForTableResponse";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class CategoryStore implements ICategoryState {
    categoryData: ICategory[] = [];
    inProgress = false;
    error = '';

    addCategoryInProgress = false;
    addCategorySuccess = false;
    addCategoryError = '';

    categoryDetailForEdit = addCategoryState;
    categoryDetailForEditInProgress = false;
    categoryDetailForEditError = '';

    deleteCategoryError = '';
    deleteCategoryInProgress = false;
    deleteCategorySuccess = false;

    categoryDataForTable = getAllCategoriesForTableState;
    categoryDataForTableError = '';
    categoryDataForTableInProgress = false;

    constructor() {
        makeObservable(this, {
            inProgress: observable,
            error: observable,
            categoryData: observable,
            addCategoryError: observable,
            addCategoryInProgress: observable,
            addCategorySuccess: observable,
            categoryDetailForEdit: observable,
            categoryDataForTable: observable,
            categoryDataForTableError: observable,
            categoryDataForTableInProgress: observable,
            categoryDetailForEditError: observable,
            categoryDetailForEditInProgress: observable,
            deleteCategoryError: observable,
            deleteCategoryInProgress: observable,
            deleteCategorySuccess: observable,
            getAllCategories: action,
            addCategory: action,
            deleteCategory: action,
            getAllCategoriesForTable: action,
            getCategoryByNameForEdit: action,
            reset: action,
            resetAddCategory: action,
            resetDeleteCategory: action,
            resetGetAllCategoriesForTable: action,
            resetGetCategoryForEdit: action,
            allCategories: computed,
            categoriesTree: computed,
            getCategoryForEditDetail: computed,
            allCategoriesForTable: computed
        })
    }

    getAllCategories = () => {
        this.inProgress = true;
        const url = UrlConstants.Category;

        return services.get(url)
            .then((response: IApiResponse<Array<ICategory>>) => {
                this.categoryData = response.data;
            })
            .catch((err: string) => {
                this.error = err;
            })
            .finally(action(() => { this.inProgress = false; }));
    }

    addCategory = (data: IAddCategory, name: string) => {
        this.addCategoryInProgress = true;

        const url = name.length ? `${UrlConstants.Category}/${name}` : UrlConstants.Category;
        const method = name.length ? services.put : services.post;

        return method(url, data)
            .then(() => {
                this.addCategorySuccess = true;
            })
            .catch((err: string) => {
                this.addCategoryError = err;
            })
            .finally(action(() => { this.addCategoryInProgress = false; }))
    };

    getCategoryByNameForEdit = (name: string) => {
        this.categoryDetailForEditInProgress = true;
        const url = `${UrlConstants.Category}/${name}`;

        return services.get(url)
            .then((response: IApiResponse<IAddCategory>) => {
                this.categoryDetailForEdit = response.data;
            })
            .catch((err: string) => {
                this.categoryDetailForEditError = err;
            }).finally(action(() => { this.categoryDetailForEditInProgress = false; }));
    }

    deleteCategory = (ids: number[]) => {
        this.deleteCategoryInProgress = true;
        const url = UrlConstants.Category;

        return services.deleteapi(url, { Ids: ids })
            .then(() => {
                this.deleteCategorySuccess = true;
            })
            .catch((err: string) => {
                this.deleteCategoryError = err;
            }).finally(action(() => { this.deleteCategoryInProgress = false; }));
    }

    getAllCategoriesForTable = (currentPage: number, pagerSize: number, searchText: string) => {
        this.categoryDataForTableInProgress = true;
        const url = `${UrlConstants.CategoriesForTable}?pageNo=${currentPage}&pageSize=${pagerSize}&searchText=${searchText}`;

        return services.get(url)
            .then((response: IApiResponse<IGetAllCategoriesForTable>) => {
                this.categoryDataForTable = response.data;
            })
            .catch((err: string) => {
                this.categoryDataForTableError = err;
            })
            .finally(action(() => { this.categoryDataForTableInProgress = false; }));
    }

    reset = () => {
        this.inProgress = false;
        this.error = '';
        this.resetAddCategory();
    }

    resetAddCategory = () => {
        this.addCategoryError = '';
        this.addCategoryInProgress = false;
        this.addCategorySuccess = false;
    }

    resetDeleteCategory = () => {
        this.deleteCategoryError = '';
        this.deleteCategoryInProgress = false;
        this.deleteCategorySuccess = false;
    }

    resetGetCategoryForEdit = () => {
        this.categoryDetailForEditError = '';
        this.categoryDetailForEditInProgress = false;
    }

    resetGetAllCategoriesForTable = () => {
        this.categoryDataForTableError = '';
        this.categoryDataForTableInProgress = false;
        this.resetAddCategory();
        this.resetGetCategoryForEdit();
        this.resetDeleteCategory();
    }

    get allCategories() {
        if (this.categoryData && this.categoryData.length > 0) {
            return this.categoryData;
        }
        return [];
    }

    get categoriesTree() {
        if (this.categoryData && this.categoryData.length > 0) {
            return nest(this.categoryData)
        }
        return [];
    }

    get getCategoryForEditDetail() {
        return { ...this.categoryDetailForEdit }
    }

    get allCategoriesForTable() {
        if (this.categoryDataForTable?.CategoriesForTable && this.categoryDataForTable.CategoriesForTable?.length > 0) {
            return this.categoryDataForTable.CategoriesForTable;
        }
        return [];
    }
}

const categoryStore = new CategoryStore();
export default categoryStore;