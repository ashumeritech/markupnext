import { IAddCategory } from "../../../models/IAddCategory";
import { ITreeView } from "../../../models/ITreeView";
import { ICategoryForTable, IGetAllCategoriesForTable } from "../response/ICategoriesForTableResponse";
import { ICategory } from "../response/ICategoryResponse";
import { IIdName } from "../response/IIdName";
import { ICommonState } from "./ICommonState";

export interface ICategoryState extends ICommonState {
    categoryData: Array<ICategory>;

    addCategoryInProgress: boolean;
    addCategorySuccess: boolean;
    addCategoryError: string;

    deleteCategoryInProgress: boolean;
    deleteCategorySuccess: boolean;
    deleteCategoryError: string;

    categoryDetailForEdit: IAddCategory;
    categoryDetailForEditInProgress: boolean;
    categoryDetailForEditError: string;

    categoryDataForTable: IGetAllCategoriesForTable;
    categoryDataForTableInProgress: boolean;
    categoryDataForTableError: string;

    getAllCategories: () => void;
    addCategory: (data: IAddCategory, name: string) => void;
    getCategoryByNameForEdit: (name: string) => void;
    deleteCategory: (ids: number[]) => void;
    getAllCategoriesForTable: (currentPage: number, pagerSize: number, searchText: string) => void;

    reset: () => void;
    resetAddCategory: () => void;
    resetDeleteCategory: () => void;
    resetGetCategoryForEdit: () => void;
    resetGetAllCategoriesForTable: () => void;

    allCategories: Array<IIdName>;
    categoriesTree: Array<ITreeView>;
    getCategoryForEditDetail: IAddCategory;
    allCategoriesForTable: Array<ICategoryForTable>;
}