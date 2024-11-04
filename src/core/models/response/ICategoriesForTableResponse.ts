export interface IGetAllCategoriesForTable {
    TotalRecords: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    CategoriesForTable: Array<ICategoryForTable>;
    NumberOfCategories: number;
}

export interface ICategoryForTable {
    Id: number;
    Name: string;
    Description: string;
    NumberOfCategories: number
}