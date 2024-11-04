import { FieldMetaProps } from 'formik';
import React from 'react';

interface IProps {
  meta: FieldMetaProps<object>;
  className?: string;
}

const FormikFormErrorHandler: React.FC<IProps> = props => {
  const _error = props.meta.error;

  return (
    <>
      {props.meta.touched &&
        props.meta.error && <span data-testid="testError" className={props.className ? props.className : "text-danger errorMessage"}>{_error}</span>}
    </>
  );
};

export default FormikFormErrorHandler;