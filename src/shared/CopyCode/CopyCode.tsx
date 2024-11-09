import { CopyToClipboard } from 'react-copy-to-clipboard';
// import ContentCopy from '../../assets/Images/Svg/content-copy.svg';

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
        {copyCodeElement ? copyCodeElement : <button className="copy-btn d-flex align-items-center float-end"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z" /></svg>Copy</button>}
    </CopyToClipboard>
}

export default CopyCode;