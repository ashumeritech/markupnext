import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import './CodeHighlighterEditor.module.css';

interface IProps {
    className?: string;
    onChange?: (newValue: string) => void;
    value: string;
    mode: string;
    readonly: boolean;
}

const CodeHighlighterEditor = (props: IProps) => {
    const { onChange, value, mode, className, readonly } = props;

    return <AceEditor
        mode={mode}
        theme="github"
        onChange={(newValue) => onChange && onChange(newValue)}
        value={value}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
            useWorker: false,
        }}
        className={className}
        fontSize={14}
        readOnly={readonly}
    />
}

export default CodeHighlighterEditor;