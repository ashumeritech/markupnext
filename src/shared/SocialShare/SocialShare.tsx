import CopyCode from "../CopyCode/CopyCode";
import './SocialShare.module.css';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";
// import Facebook  from '../../assets/Images/Svg/facebook.svg';
// import X from '../../assets/Images/Svg/x.svg';
// import  Linkedin from '../../assets/Images/Svg/linkedin.svg';
// import Copy from '../../assets/Images/Svg/copy.svg';

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
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" width="512" height="512">
                        <g>
                            <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
                        </g>
                    </svg>Facebook
                </FacebookShareButton>
            </li>
            <li>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="bi bi-twitter me-2"></i> Twitter</a> */}
                <TwitterShareButton
                    url={linkToCopy}
                    className="dropdown-item d-flex align-items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24">
                        <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
                    </svg>Twitter
                </TwitterShareButton>
            </li>
            <li>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="bi bi-linkedin me-2"></i> Linkedin</a> */}
                <LinkedinShareButton
                    url={linkToCopy}
                    className="dropdown-item d-flex align-items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" width="512" height="512">
                        <g>
                            <path id="Path_2525" d="M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262" />
                            <path id="Path_2520" d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463" />
                            <path id="Path_2526" d="M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031" />
                        </g>
                    </svg>Linkedin
                </LinkedinShareButton>
            </li>
            <li className="border-top">
                <CopyCode copyValue={linkToCopy} setStateCopied={setIsLinkCopied}
                    copyCodeElement={
                        <button className="dropdown-item d-flex align-items-center">
                            <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m15 20h-10a5.006 5.006 0 0 1 -5-5v-10a5.006 5.006 0 0 1 5-5h10a5.006 5.006 0 0 1 5 5v10a5.006 5.006 0 0 1 -5 5zm-10-18a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-10a3 3 0 0 0 -3-3zm19 17v-13a1 1 0 0 0 -2 0v13a3 3 0 0 1 -3 3h-13a1 1 0 0 0 0 2h13a5.006 5.006 0 0 0 5-5z" /></svg>Copy Link
                        </button>} />
            </li>
        </ul>
    </div>
}

export default SocialShare;