import { useField } from "formik";
import FormikFormErrorHandler from "./FormikFormErrorHandler";
import CodeHighlighterEditor from "../CodeHighlighterEditor/CodeHighlighterEditor";

interface IProps {
    className: string;
    name: string;
    onChange: () => void;
    value: string;
    mode: string;
}

const FormikFormCodeEditor = (props: IProps) => {
    const [field, meta, helpers] = useField(props);
    const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;

    return (
        <>
            <CodeHighlighterEditor
                className={errorClass}
                value={field.value}
                mode={props.mode}
                readonly={false}
                onChange={(newValue: string) => helpers.setValue(newValue)}
            />
            <FormikFormErrorHandler meta={meta} />
        </>
    );
}

export default FormikFormCodeEditor;