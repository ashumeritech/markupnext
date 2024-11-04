import { Field, Form, Formik, useFormikContext } from "formik";
import FormikFormTextArea from "../../shared/FormikFormHandlers/FormikFormTextArea";
import LoaderButton from "../../shared/Button/LoaderButton";
import { useEffect } from "react";
import { AddCategoryValidateSchema } from "./AddCategoryValidation";
import { IAddCategory } from "../../models/IAddCategory";
import FormikFormSelectField from "../../shared/FormikFormHandlers/FormikFormSelectField";
import { IIdName } from "../../core/models/response/IIdName";
import SpinnerLoader from "../../shared/Loader/SpinnerLoader";
import { useNavigate } from "react-router-dom";

interface IProps {
    addCategoryLoading: boolean;
    submitHandler: (values: IAddCategory) => void;
    addCategorySuccess: boolean;
    categories: IIdName[];
    getCategoriesLoading: boolean;
    initialValues: IAddCategory;
    name: string;
    getCategoryForEditLoading: boolean;
}

const AddCategoryForm = (props: IProps) => {
    const navigate = useNavigate();

    const FormObserver: React.FC = () => {
        const { resetForm, values } = useFormikContext<IAddCategory>();

        useEffect(() => {
            if (props.addCategorySuccess) {
                if (isCategoryEdit)
                    navigate(`/editCategory/${values.Name}`);
                else
                    resetForm();
            }
        }, [resetForm]);
        return null;
    };

    const isCategoryEdit = props.name.length;

    return <>
        {props.getCategoriesLoading || props.getCategoryForEditLoading ? <SpinnerLoader /> : null}
        <Formik
            enableReinitialize
            initialValues={props.initialValues}
            validationSchema={AddCategoryValidateSchema}
            onSubmit={(values: IAddCategory) => props.submitHandler(
                { ...values, ParentId: values.ParentId === 0 ? null : values.ParentId }
            )}
        >

            <div className="w-75 mx-auto">
                <h1 className="h4 mt-4">{isCategoryEdit ? 'Edit Category' : 'Add New Category'}</h1>
                <div className="bg-light p-4 rounded-4 shadow-sm border">
                    <Form noValidate>
                        <FormObserver />
                        <div className="form-group mb-2">
                            <label>Name</label>
                            <Field
                                name='Name'
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
                            <label>Parent Category</label>
                            <Field
                                name='ParentId'
                                as={FormikFormSelectField}
                                className='form-control'
                                typeofoptionid='number'
                                options={[{ Id: 0, Name: 'None' }, ...props.categories]}
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
                                        isLoading={props.addCategoryLoading}
                                        text='Submit'
                                        className='btn btn-sm btn-primary w-100'
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    </>
}

export default AddCategoryForm;