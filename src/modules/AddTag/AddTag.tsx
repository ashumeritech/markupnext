'use client'
import { observer } from "mobx-react-lite";
import { useStore } from "../../contexts/StoreProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../constants/error.constant";
import AddTagForm from "./AddTagForm";
import { IAddTag } from "../../models/IAddTag";
import DashboardHeader from "../../shared/DashboardHeader/DashboardHeader";
import DashboardLeftSidebar from "../../shared/DashboardLeftSidebar/DashboardLeftSidebar";
import { addTagState } from "../../core/initialState/addTag.state";

const AddTag = () => {
    const { tagsStore } = useStore();
    const { addTag, addTagError, addTagInProgress, addTagSuccess, resetAddTag, getTagForEditDetail,
        getTagByNameForEdit, tagDetailForEditError, tagDetailForEditInProgress, resetGetTagForEdit } = tagsStore;

    const pathSubstring1 = window.location.pathname.substring(1);
    const tagName = pathSubstring1 === 'addTag' ? '' : window.location.pathname.substring(9).replaceAll('-', ' ');

    useEffect(() => {
        if (tagName.length)
            getTagByNameForEdit(tagName);
    }, [getTagByNameForEdit, tagName]);

    const submitHandler = (values: IAddTag) => {
        addTag(values, tagName);
    }

    useEffect(() => {
        if (tagDetailForEditError) {
            toast.error(tagDetailForEditError);
            resetGetTagForEdit();
        }
    }, [tagDetailForEditError, resetGetTagForEdit]);

    useEffect(() => {
        if (addTagSuccess) {
            if (tagName.length)
                toast.success("Tag updated successfully.");
            else
                toast.success("Tag added successfully.");;
            resetAddTag();
        }
    }, [addTagSuccess, resetAddTag, tagName.length]);

    useEffect(() => {
        if (addTagError) {
            if (addTagError === ErrorMessage.NameAlreadyExists)
                toast.error("Tag Name already exists.");
            else if (tagName.length)
                toast.error("Failed to update Tag.");
            else
                toast.error("Failed to add Tag.");
            resetAddTag();
        }
    }, [addTagError, resetAddTag, tagName.length]);

    return <>
        <div>
            <DashboardHeader />
            <DashboardLeftSidebar />
            <AddTagForm
                addTagLoading={addTagInProgress}
                submitHandler={submitHandler}
                addTagSuccess={addTagSuccess}
                initialValues={tagName.length ? getTagForEditDetail : addTagState}
                name={tagName}
                getTagForEditLoading={tagDetailForEditInProgress}
            />
        </div>
    </>;
}

export default observer(AddTag);