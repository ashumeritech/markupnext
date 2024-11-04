import { Field, Form, Formik, useFormikContext } from "formik";
import FormikFormTextArea from "../../shared/FormikFormHandlers/FormikFormTextArea";
import LoaderButton from "../../shared/Button/LoaderButton";
import { useEffect } from "react";
import { AddTagValidateSchema } from "./AddTagValidation";
import { IAddTag } from "../../models/IAddTag";
import SpinnerLoader from "../../shared/Loader/SpinnerLoader";
import { useNavigate } from "react-router-dom";

interface IProps {
    addTagLoading: boolean;
    submitHandler: (values: IAddTag) => void;
    addTagSuccess: boolean;
    initialValues: IAddTag;
    name: string;
    getTagForEditLoading: boolean;
}

const AddTagForm = (props: IProps) => {
    const navigate = useNavigate();

    const FormObserver: React.FC = () => {
        const { resetForm, values } = useFormikContext<IAddTag>();

        useEffect(() => {
            if (props.addTagSuccess) {
                if (isTagEdit)
                    navigate(`/editTag/${values.Name}`);
                else
                    resetForm();
            }
        }, [resetForm]);
        return null;
    };

    const isTagEdit = props.name.length;

    return <>
        {props.getTagForEditLoading ? <SpinnerLoader /> : null}
        <Formik
            enableReinitialize
            initialValues={props.initialValues}
            validationSchema={AddTagValidateSchema}
            onSubmit={(values: IAddTag) => props.submitHandler(values)}
        >

            <div className="w-75 mx-auto">
                <h1 className="h4 mt-4">{isTagEdit ? 'Edit Tag' : 'Add New Tag'}</h1>
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
                                        isLoading={props.addTagLoading}
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

export default AddTagForm;