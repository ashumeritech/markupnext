'use client'
import { observer } from "mobx-react-lite";
import { useStore } from "../../contexts/StoreProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../constants/error.constant";
import AddCategoryForm from "./AddCategoryForm";
import { IAddCategory } from "../../models/IAddCategory";
import DashboardLeftSidebar from "../../shared/DashboardLeftSidebar/DashboardLeftSidebar";
import DashboardHeader from "../../shared/DashboardHeader/DashboardHeader";
import { addCategoryState } from "../../core/initialState/addCategory.state";
import Footer from "../../shared/Footer/Footer";

const AddCategory = () => {
    const { categoryStore } = useStore();
    const { addCategory, addCategoryError, error, addCategoryInProgress, addCategorySuccess, resetAddCategory,
        getAllCategories, allCategories, reset, inProgress, getCategoryByNameForEdit, getCategoryForEditDetail,
        categoryDetailForEditError, categoryDetailForEditInProgress, resetGetCategoryForEdit } = categoryStore;

    const pathSubstring1 = window.location.pathname.substring(1);
    const categoryName = pathSubstring1 === 'addCategory' ? '' : window.location.pathname.substring(14).replaceAll('-', ' ');

    useEffect(() => {
        if (categoryName.length)
            getCategoryByNameForEdit(categoryName);
    }, [getCategoryByNameForEdit, categoryName]);

    const submitHandler = (values: IAddCategory) => {
        addCategory(values, categoryName);
    }

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
    }, [error, reset]);

    useEffect(() => {
        if (categoryDetailForEditError) {
            toast.error(categoryDetailForEditError);
            resetGetCategoryForEdit();
        }
    }, [categoryDetailForEditError, resetGetCategoryForEdit]);

    useEffect(() => {
        if (addCategorySuccess) {
            if (categoryName.length)
                toast.success("Category updated successfully.");
            else
                toast.success("Category added successfully.");
            resetAddCategory();
            getAllCategories();
        }
    }, [addCategorySuccess, resetAddCategory, getAllCategories, categoryName.length]);

    useEffect(() => {
        if (addCategoryError) {
            if (addCategoryError === ErrorMessage.NameAlreadyExists)
                toast.error("Category Name already exists.");
            else if (categoryName.length)
                toast.error("Failed to update Category.");
            else
                toast.error("Failed to add Category.");
            resetAddCategory();
        }
    }, [addCategoryError, resetAddCategory, categoryName.length]);

    return <>
        <div>
            <DashboardHeader />
            <DashboardLeftSidebar />
            <AddCategoryForm
                addCategoryLoading={addCategoryInProgress}
                submitHandler={submitHandler}
                addCategorySuccess={addCategorySuccess}
                categories={[...allCategories.filter(category => category.Name !== 'Uncategory')]}
                getCategoriesLoading={inProgress}
                initialValues={categoryName.length ? getCategoryForEditDetail : addCategoryState}
                name={categoryName}
                getCategoryForEditLoading={categoryDetailForEditInProgress}
            />
        </div>
    </>;
}

export default observer(AddCategory);