import { useField } from "formik";
import React from "react";
import FormikFormErrorHandler from './FormikFormErrorHandler';

interface IProps {
  children: React.ReactNode;
  className: string;
  name: string;
  onBlur: () => void;
  onChange: () => void;
  placeholder: string;
  typeofoptionid: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  spaceAllowed: boolean;
  options: Array<{ Id: number | string, Name: string, hidden: boolean }>
}

const FormikFormSelectField = (props: IProps) => {
  const [field, meta, helpers] = useField(props);
  const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;

  return (
    <>
      <select
        {...props}
        {...field}
        disabled={props.disabled}
        className={props.className + ' ' + errorClass}
        onChange={e => {
          props.typeofoptionid === 'number' ? helpers.setValue(parseInt(e.target.value)) : helpers.setValue(e.target.value)
        }}
      >
        {props.options?.map((data) => {
          return <option key={data.Id} value={data.Id} hidden={data.hidden} data-testid={data.Id}>{data.Name}</option>;
        })}
      </select>
      <FormikFormErrorHandler meta={meta} />
    </>
  );
};

export default FormikFormSelectField;