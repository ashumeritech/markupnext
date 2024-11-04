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
  type: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  row?: number;
  validCharacter?: Array<string>;
  invalidCharacter?: Array<string>;
  maxLength: number;
}

const FormikFormTextArea = (props: IProps) => {
  const [field, meta, helpers] = useField(props);
  const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;
  const { row, validCharacter, invalidCharacter } = props;
  const _placeholder = props.placeholder;

  let subStrArr = ["?", ">", "<", "'", '"', ":", ";", ",", "+", "-", "(", ")", "*", "&", "^", "%", "$", "#", "{", "[", "]", "}", "|", "/", "=", "_", '~', '\\', '`']

  if (validCharacter)
    subStrArr = subStrArr.filter(el => !validCharacter.includes(el));
  if (invalidCharacter)
    invalidCharacter.forEach(el => subStrArr.push(el));

  return (
    <>
      <textarea {...field}
        placeholder={_placeholder}
        className={props.className + ' ' + errorClass}
        disabled={props.disabled}
        readOnly={props.readOnly}
        rows={row}
        maxLength={props.maxLength}
        onChange={event => {
          if (event.target.value.length > props.maxLength)
            event.target.value = event.target.value.slice(0, props.maxLength);
          event.target.value = event.target.value.replace(/ +(?= )/g, '');
          helpers.setValue(event.target.value);
        }}
      />
      <FormikFormErrorHandler meta={meta} />
    </>
  );
};

export default FormikFormTextArea;