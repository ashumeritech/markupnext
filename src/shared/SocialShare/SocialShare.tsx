import CopyCode from "../CopyCode/CopyCode";
import './SocialShare.module.css';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";
import Facebook  from '../../assets/Images/Svg/facebook.svg';
import X from '../../assets/Images/Svg/x.svg';
import  Linkedin from '../../assets/Images/Svg/linkedin.svg';
import Copy from '../../assets/Images/Svg/copy.svg';

interface IProps {
    linkToCopy: string;
    setIsLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialShare = (props: IProps) => {
    const { setIsLinkCopied, linkToCopy } = props;

    return <div className="sharing-btns">
        <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-share"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="bi bi-facebook me-2"></i> Facebook</a> */}
                <FacebookShareButton
                    url={linkToCopy}
                    className="dropdown-item d-flex align-items-center"
                >
                    <Facebook />Facebook
                </FacebookShareButton>
            </li>
            <li>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="bi bi-twitter me-2"></i> Twitter</a> */}
                <TwitterShareButton
                    url={linkToCopy}
                    className="dropdown-item d-flex align-items-center"
                >
                    <X />Twitter
                </TwitterShareButton>
            </li>
            <li>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="bi bi-linkedin me-2"></i> Linkedin</a> */}
                <LinkedinShareButton
                    url={linkToCopy}
                    className="dropdown-item d-flex align-items-center"
                >
                    <Linkedin />Linkedin
                </LinkedinShareButton>
            </li>
            <li className="border-top">
                <CopyCode copyValue={linkToCopy} setStateCopied={setIsLinkCopied}
                    copyCodeElement={
                        <button className="dropdown-item d-flex align-items-center">
                            <Copy />Copy Link
                        </button>} />
            </li>
        </ul>
    </div>
}

export default SocialShare;