'use client'
import { observer } from "mobx-react-lite";
import AddPostForm from "./AddPostForm";
import { useStore } from "../../contexts/StoreProvider";
import { IAddPost } from "../../models/IAddPost";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../constants/error.constant";
import DashboardHeader from "../../shared/DashboardHeader/DashboardHeader";
import DashboardLeftSidebar from "../../shared/DashboardLeftSidebar/DashboardLeftSidebar";
import { addPostState } from "../../core/initialState/addPost.state";
import { useParams } from "next/navigation";

const AddPost = () => {
    const { postsStore, categoryStore, tagsStore } = useStore();
    const { addPost, addPostError, addPostInProgress, addPostSuccess, resetAddPost, getPostByTitleForEdit,
        getPostForEditDetail, singlePostForEditInProgress, singlePostForEditError, resetGetPostForEdit } = postsStore;
    const { getAllCategories, inProgress, error, reset, categoriesTree } = categoryStore;
    const { getAllTags, inProgress: tagsInProgress, error: tagsError, reset: resetTags, allTags } = tagsStore;

    const params = useParams();

    const postTitle = params.postTitle ? (params.postTitle as string).replaceAll('-', ' ') : '';

    // const [isInFullScreen, setIsInFullScreen] = useState(false);

    useEffect(() => {
        if (postTitle.length)
            getPostByTitleForEdit(postTitle);
    }, [getPostByTitleForEdit, postTitle]);

    const submitHandler = (values: IAddPost) => {
        addPost(values, postTitle);
    }

    useEffect(() => {
        getAllCategories();
        getAllTags();
    }, [getAllCategories, getAllTags]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
    }, [error, reset]);

    useEffect(() => {
        if (tagsError) {
            toast.error(tagsError);
            resetTags();
        }
    }, [tagsError, resetTags]);

    useEffect(() => {
        if (singlePostForEditError) {
            toast.error(singlePostForEditError);
            resetGetPostForEdit();
        }
    }, [singlePostForEditError, resetGetPostForEdit]);

    useEffect(() => {
        if (addPostSuccess) {
            if (postTitle.length)
                toast.success("Post updated successfully.");
            else
                toast.success("Post added successfully.");
            resetAddPost();
        }
    }, [addPostSuccess, resetAddPost, postTitle.length]);

    useEffect(() => {
        if (addPostError) {
            if (addPostError === ErrorMessage.NameAlreadyExists)
                toast.error("Post title already exists.");
            else if (postTitle.length)
                toast.error("Failed to update post.");
            else
                toast.error("Failed to add post.");
            resetAddPost();
        }
    }, [addPostError, resetAddPost, postTitle.length]);

    return <>
        <div>
            <DashboardHeader />
            <DashboardLeftSidebar />
            <AddPostForm
                addPostLoading={addPostInProgress}
                submitHandler={submitHandler}
                addPostSuccess={addPostSuccess}
                categories={categoriesTree}
                getCategoriesLoading={inProgress}
                tags={allTags}
                getTagsLoading={tagsInProgress}
                initialValues={postTitle.length ? getPostForEditDetail : addPostState}
                title={postTitle}
                getPostForEditLoading={singlePostForEditInProgress}
            />
        </div>
    </>;
}

export default observer(AddPost);