import { useRef, useEffect } from 'react';
import { getFullHtmlContent } from '../../helpers/fullHtml.helper';

interface IProps {
    htmlCode: string,
    cssCode: string,
    jsCode: string,
    headTag: string
    title: string;
}

const Preview = (props: IProps) => {
    const { htmlCode, cssCode, jsCode, headTag, title } = props;
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentDocument) {
            const document = iframe.contentDocument;

            let fullHtmlContent = getFullHtmlContent(htmlCode, cssCode, jsCode, headTag, title, false);

            // Clear previous content
            document.open();
            document.write(fullHtmlContent);
            document.close();
        }
    }, [htmlCode, cssCode, jsCode, headTag]);

    return (
        <iframe
            ref={iframeRef}
            title="code-preview"
            className='preview-iframe'
        />
    );
};

export default Preview;