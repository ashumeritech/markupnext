import saveAs from 'file-saver';
import JSZip from 'jszip';
import { getFullHtmlContent } from '../../helpers/fullHtml.helper';

interface IProps {
    htmlCode: string;
    cssCode: string;
    jsCode: string;
    postTitle: string;
    headTag: string;
    title: string;
}

const OtherFeatures = (props: IProps) => {
    const { htmlCode, cssCode, jsCode, postTitle, headTag, title } = props;

    const handleDownload = () => {
        let htmlFile: Blob | null = null;
        let cssFile: Blob | null = null;
        let jsFile: Blob | null = null;

        if (htmlCode.length) {
            let fullHtmlContent = getFullHtmlContent(htmlCode, cssCode, jsCode, headTag, title, true);
            htmlFile = new Blob([fullHtmlContent], { type: 'html' });
        }
        if (cssCode.length) cssFile = new Blob([cssCode], { type: 'css' });
        if (jsCode.length) jsFile = new Blob([jsCode], { type: 'js' });

        const zip = new JSZip();
        if (htmlFile) zip.file('index.html', htmlFile);
        if (cssFile) zip.file('style.css', cssFile);
        if (jsFile) zip.file('javascript.js', jsFile);

        if (zip.files) zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, `${postTitle}.zip`);
        });
    }

    return <div className="btn-group">
        <button type="button" className="border-0 bg-transparent" style={{ lineHeight: "normal" }} data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-three-dots-vertical text-secondary" style={{ fontSize: '18px' }}></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li><button className="dropdown-item" onClick={handleDownload}><i className="bi bi-download me-2"></i>Download</button></li>
        </ul>
    </div>
}

export default OtherFeatures;