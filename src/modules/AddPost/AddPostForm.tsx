import { Field, Form, Formik, useFormikContext } from "formik";
import { AddPostValidateSchema } from "./AddPostValidation";
import FormikFormTextArea from "../../shared/FormikFormHandlers/FormikFormTextArea";
import FormikFormFileInput from "../../shared/FormikFormHandlers/FormikFormFIleInput";
import LoaderButton from "../../shared/Button/LoaderButton";
import { IAddPost } from "../../models/IAddPost";
import { useEffect } from "react";
import FormikFormDropdownTable from "../../shared/FormikFormHandlers/FormikFormDropdownTable";
import { IIdName } from "../../core/models/response/IIdName";
import SpinnerLoader from "../../shared/Loader/SpinnerLoader";
import FormikFormCodeEditor from "../../shared/FormikFormHandlers/FormikFormCodeEditor";
import FormikFormCheckboxTree from "../../shared/FormikFormHandlers/FormikFormCheckboxTree";
import { ITreeView } from "../../models/ITreeView";
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface IProps {
    addPostLoading: boolean;
    submitHandler: (values: IAddPost) => void;
    addPostSuccess: boolean;
    categories: ITreeView[];
    getCategoriesLoading: boolean;
    tags: IIdName[];
    getTagsLoading: boolean;
    initialValues: IAddPost;
    title: string;
    getPostForEditLoading: boolean;
}

const AddPostForm = (props: IProps) => {

    const router = useRouter();
    const FormObserver: React.FC = () => {
        const { resetForm, values } = useFormikContext<IAddPost>();

        useEffect(() => {
            if (props.addPostSuccess) {
                if (isPostEdit)
                    router.push(`/editPost/${values.Title}`);
                else
                    resetForm();
            }
        }, [resetForm]);
        return null;
    };

    const isPostEdit = props.title.length;

    return <>
        {props.getCategoriesLoading || props.getTagsLoading || props.getPostForEditLoading ? <SpinnerLoader /> : null}
        <Formik
            enableReinitialize
            initialValues={props.initialValues}
            validationSchema={AddPostValidateSchema}
            onSubmit={(values: IAddPost) => {
                const categoryIds = [...values.CategoryIds];

                let valuesToSubmit = { ...values };

                const uncategoryId = props.categories.find(category => category.Name === 'Uncategory')?.Id;

                if (uncategoryId)
                    if (categoryIds.length > 1 && categoryIds.includes(uncategoryId))
                        valuesToSubmit = { ...values, CategoryIds: categoryIds.filter(id => id !== uncategoryId) };
                    else if (categoryIds.length === 0)
                        valuesToSubmit = { ...values, CategoryIds: [uncategoryId] };

                props.submitHandler(valuesToSubmit);
            }}
        >
            {({
                values
            }) => (

                <div className="w-75 mx-auto">
                    <h1 className="h4 mt-4">{isPostEdit ? 'Edit Post' : 'Add New Post'}</h1>
                    <div className="bg-light p-4 rounded-4 shadow-sm border">
                        <Form noValidate>
                            <FormObserver />
                            <div className="form-group mb-2">
                                <label>Title</label>
                                <Field
                                    name='Title'
                                    as={FormikFormTextArea}
                                    className='form-control'
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label>Description</label>
                                <Field
                                    name='Description'
                                    as={FormikFormTextArea}
                                    className='form-control'
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label>Html Code</label>
                                <Field
                                    name='HtmlCode'
                                    as={FormikFormCodeEditor}
                                    className='form-control'
                                    mode='xml'
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label>Css Code</label>
                                <Field
                                    name='CssCode'
                                    as={FormikFormCodeEditor}
                                    className='form-control'
                                    mode='css'
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label>Js Code</label>
                                <Field
                                    name='JsCode'
                                    as={FormikFormCodeEditor}
                                    className='form-control'
                                    mode='javascript'
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label>Head Tag</label>
                                <Field
                                    name='HeadTag'
                                    as={FormikFormCodeEditor}
                                    className='form-control'
                                    mode='xml'
                                />
                            </div>

                            <div className="form-group mb-2 bg-white p-3">
                                <label className="d-block">Preview Image</label>
                                <label className="me-2">
                                    <span data-testid='testFileUpload'>
                                        <i className="material-symbols-outlined attachment-icon">attachment</i>
                                    </span>
                                    <Field
                                        as={FormikFormFileInput}
                                        name='Image'
                                        accept="image/*"
                                    />
                                </label>
                                {values.Image?.name ? <>
                                    <span className="file-upload-name" data-testid='testFileName'>
                                        {values.Image.name.includes('') ? values.Image.name.replace('http://localhost:7001/Image/', '') : values.Image.name}
                                    </span>
                                    <div className="border mt-2">
                                        <Image src={values.Image.name.includes('http://localhost:7001/') ? values.Image.name : URL.createObjectURL(values.Image as any)} alt={values.Image.name} className="img-fluid" />
                                    </div>
                                </> : <></>
                                }
                            </div>

                            <div className="form-group mb-3">
                                <Field
                                    name='CategoryIds'
                                    as={FormikFormCheckboxTree}
                                    tree={props.categories}
                                    label='Select Categories'
                                />
                            </div>

                            <div className="form-group mb-3">
                                <Field
                                    name='TagIds'
                                    as={FormikFormDropdownTable}
                                    typeofoptionid='number'
                                    options={props.tags}
                                    label='Select Tags'
                                />
                            </div>

                            <div className="form-group mt-4">
                                <div className="row">
                                    <div className="col-6">
                                        <LoaderButton
                                            type="reset"
                                            text='Reset'
                                            className='btn btn-sm btn-secondary w-100'
                                        />
                                    </div>
                                    <div className="col-6">
                                        <LoaderButton
                                            type="submit"
                                            isLoading={props.addPostLoading}
                                            text='Submit'
                                            className='btn btn-sm btn-primary w-100'
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    </>
}

export default AddPostForm;