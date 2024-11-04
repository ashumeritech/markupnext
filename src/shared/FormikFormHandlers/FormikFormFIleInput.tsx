import React from 'react';
import FormikFormErrorHandler from './FormikFormErrorHandler';
import { useField } from 'formik';

interface IProps {
    children: React.ReactNode;
    className: string;
    name: string;
    onBlur: () => void;
    onChange: () => void;
    placeholder: string;
    value: string;
    disabled: boolean;
    id: string;
    accept: string;
}

const FormikFormFileInput = (props: IProps) => {
    const [, meta, helpers] = useField(props);
    const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;

    return (
        <>
            <input
                name={props.name}
                className={props.className + ' ' + errorClass}
                disabled={props.disabled}
                type='file'
                onChange={e => {
                    e.target.files && e.target.files[0] && helpers.setValue(e.target.files[0]);
                }}
                onClick={e => e.currentTarget.value = ''}
                style={{ display: 'none' }}
                accept={props.accept}
            />
            <FormikFormErrorHandler meta={meta} />
        </>
    );
};

export default FormikFormFileInput;