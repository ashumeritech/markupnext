import { IGetAllCategoriesForTable } from "../models/response/ICategoriesForTableResponse";

export const getAllCategoriesForTableState: IGetAllCategoriesForTable = {
    TotalRecords: 0,
    TotalPages: 0,
    CurrentPage: 0,
    PageSize: 0,
    CategoriesForTable: [],
    NumberOfCategories: 0
}