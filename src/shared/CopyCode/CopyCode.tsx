import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopy from '../../assets/Images/Svg/content-copy.svg';

interface IProps {
    copyValue: string;
    setStateCopied: React.Dispatch<React.SetStateAction<boolean>>;
    copyCodeElement?: React.ReactElement;
}

const CopyCode = (props: IProps) => {
    const { copyValue, setStateCopied, copyCodeElement } = props;

    return <CopyToClipboard text={copyValue}
        onCopy={() => {
            setStateCopied(true)
            setTimeout(() => {
                setStateCopied(false);
            }, 1500);
        }}>
        {copyCodeElement ? copyCodeElement : <button className="copy-btn d-flex align-items-center float-end"><ContentCopy />Copy</button>}
    </CopyToClipboard>
}

export default CopyCode;