'use client'
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../../contexts/StoreProvider";
import { IPost } from "../../core/models/response/IPostsResponse";
import { getTrimmedName } from "../../helpers/links.helper";
import CodeHighlighterEditor from "../../shared/CodeHighlighterEditor/CodeHighlighterEditor";
import Preview from "../../shared/CodePreview/Preview";
import CopyCode from "../../shared/CopyCode/CopyCode";
import PageLoader from "../../shared/Loader/PageLoader";
import SocialShare from "../../shared/SocialShare/SocialShare";
import BelowPostThumbnailAd from "../../shared/Ads/BelowPostThumbnailAd";
// import { ReactComponent as Code } from '../../assets/Images/Svg/code.svg';
import Code from '../../assets/Images/Svg/code.svg';
import Check from '../../assets/Images/Svg/check.svg';
import { useRouter } from "next/router";
import Link from "next/link";

const SinglePost = () => {
    const { postsStore, preferenceStore } = useStore();
    const { getPostByTitle, getSinglePost, resetGetSinglePost, singlePostError, singlePostInProgress, allPosts } = postsStore;
    const { updateTitle, updateSubTitle } = preferenceStore;

    const postTitle = window.location.pathname.substring(1).replaceAll('-', ' ');

    const [isInFullScreen, setIsInFullScreen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        getPostByTitle(postTitle);
    }, [getPostByTitle, postTitle]);

    useEffect(() => {
        if (getSinglePost.Title) {
            updateTitle(getSinglePost.Title);
            updateSubTitle(getSinglePost.Description);
        }
    }, [getSinglePost.Title, getSinglePost.Description]);

    useEffect(() => {
        if (singlePostError) {
            toast.error(singlePostError);
            resetGetSinglePost();
        }
    }, [singlePostError, resetGetSinglePost]);

    const [htmlCopied, setHtmlCopied] = useState(false);
    const [cssCopied, setCssCopied] = useState(false);
    const [jsCopied, setJsCopied] = useState(false);
    const [headTagCopied, setHeadTagCopied] = useState(false);

    const currentPost = allPosts.find(post => post.Id === getSinglePost.Id);

    let currentPostIndex: number = -1;

    if (currentPost) {
        currentPostIndex = allPosts.indexOf(currentPost);
    }

    const previousPost = currentPostIndex >= 0 ? allPosts[currentPostIndex - 1] : undefined;
    const nextPost = currentPostIndex >= 0 ? allPosts[currentPostIndex + 1] : undefined;

    const [isLinkCopied, setIsLinkCopied] = useState(false);

    useEffect(() => {
        if (isLinkCopied) {
            toast.success('Link copied successfully');
            setIsLinkCopied(false);
        }
    }, [isLinkCopied]);

    const getTrimmedTitle = (post: IPost) => {
        return getTrimmedName(post.Title);
    }

    useEffect(() => {
        if (!getSinglePost.Title && singlePostError) {
            router.push("/page-not-found")
        }
    }, [getSinglePost.Title, singlePostError]);

    return <>
        {singlePostInProgress ? <PageLoader /> : <>
            <div id="main-content" className={`${isInFullScreen ? 'fullscreen' : ''}`}>
                <div className="container">
                    <div className="post-preview shadow-sm my-3">
                        <div className='post-preview-header d-flex align-items-center'>
                            <div className="btn-group">
                                <Link style={{ pointerEvents: previousPost ? 'auto' : 'none' }} href={previousPost ? `/${getTrimmedTitle(previousPost)}` : ''} className="btn px-2 py-0">
                                    <i className="bi bi-arrow-left-circle text-secondary fs-4"></i>
                                </Link>
                                <Link style={{ pointerEvents: nextPost ? 'auto' : 'none' }} href={nextPost ? `/${getTrimmedTitle(nextPost)}` : ''} className="btn px-2 py-0">
                                    <i className="bi bi-arrow-right-circle text-secondary fs-4"></i>
                                </Link>
                            </div>

                            <div className="d-flex align-items-center gap-3 ms-auto">
                                <a href="#view-code" className="btn btn-sm btn-primary"><Code />View Code</a>
                                <div className="sharing-btns">
                                    <SocialShare linkToCopy={window.location.href} setIsLinkCopied={setIsLinkCopied} />
                                </div>
                                <div className="fullscreen-mode" onClick={() => setIsInFullScreen(!isInFullScreen)}>
                                    <button className="btn px-2 py-0"><i className="bi bi-arrows-fullscreen text-secondary fs-6"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='post-preview-body'>
                            <Preview
                                htmlCode={getSinglePost.HtmlCode}
                                cssCode={getSinglePost.CssCode}
                                jsCode={getSinglePost.JsCode}
                                headTag={getSinglePost.HeadTag}
                                title={getSinglePost.Title}
                            />
                        </div>
                    </div>


                    <div className="ad-box text-center my-2">
                        <BelowPostThumbnailAd />
                    </div>


                    <div id="view-code">
                        <div className="bg-white border shadow-sm overflow-hidden p-3 rounded-2">
                            <h1 className="h3">{getSinglePost.Title}</h1>
                            <p>{getSinglePost.Description}</p>

                            <div className="code-tabs mb-3 mt-4 border-top border-bottom">
                                <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                                    {getSinglePost.HtmlCode.length ? <button className="nav-link active" id="nav-html-tab" data-bs-toggle="tab" data-bs-target="#nav-html" type="button" role="tab" aria-controls="nav-html" aria-selected="true">HTML</button> : <></>}
                                    {getSinglePost.CssCode.length ? <button className="nav-link" id="nav-css-tab" data-bs-toggle="tab" data-bs-target="#nav-css" type="button" role="tab" aria-controls="nav-css" aria-selected="false">CSS</button> : <></>}
                                    {getSinglePost.JsCode.length ? <button className="nav-link" id="nav-javascript-tab" data-bs-toggle="tab" data-bs-target="#nav-javascript" type="button" role="tab" aria-controls="nav-javascript" aria-selected="false">JavaScript</button> : <></>}
                                    {/* {getSinglePost.HeadTag.length ? <button className="nav-link" id="nav-headTag-tab" data-bs-toggle="tab" data-bs-target="#nav-headTag" type="button" role="tab" aria-controls="nav-headTag" aria-selected="false">Head Tag</button> : <></>} */}
                                </div>
                            </div>

                            <div className="tab-content w-100 float-start" id="nav-tabContent">
                                {getSinglePost.HtmlCode.length ? <div className="tab-pane fade show active" id="nav-html" role="tabpanel" aria-labelledby="nav-html-tab">
                                    <div className="position-relative mb-4 shadow-sm border-bottom">
                                        <div className="highlighter-header rounded-top">
                                            <span className="highlighter-heading">HTML</span>
                                            <CopyCode copyValue={getSinglePost.HtmlCode} setStateCopied={setHtmlCopied} />
                                        </div>
                                        {htmlCopied ? <span className="content-Copied"><Check />Copied</span> : null}

                                        <CodeHighlighterEditor
                                            value={getSinglePost.HtmlCode}
                                            mode={"xml"}
                                            readonly={true}
                                        />
                                    </div>
                                </div> : <></>}
                                {getSinglePost.CssCode.length ? <div className="tab-pane fade" id="nav-css" role="tabpanel" aria-labelledby="nav-css-tab">
                                    <div className="position-relative mb-4 shadow-sm border-bottom">
                                        <div className="highlighter-header rounded-top">
                                            <span className="highlighter-heading">CSS</span>
                                            <CopyCode copyValue={getSinglePost.CssCode} setStateCopied={setCssCopied} />
                                        </div>
                                        {cssCopied ? <span className="content-Copied"><Check />Copied</span> : null}

                                        <CodeHighlighterEditor
                                            value={getSinglePost.CssCode}
                                            mode={"css"}
                                            readonly={true}
                                        />
                                    </div>
                                </div> : <></>}
                                {getSinglePost.JsCode.length ? <div className="tab-pane fade" id="nav-javascript" role="tabpanel" aria-labelledby="nav-javascript-tab">
                                    <div className="position-relative mb-4 shadow-sm border-bottom">
                                        <div className="highlighter-header rounded-top">
                                            <span className="highlighter-heading">JS</span>
                                            <CopyCode copyValue={getSinglePost.JsCode} setStateCopied={setJsCopied} />
                                        </div>
                                        {jsCopied ? <span className="content-Copied"><Check />Copied</span> : null}

                                        <CodeHighlighterEditor
                                            value={getSinglePost.JsCode}
                                            mode={"javascript"}
                                            readonly={true}
                                        />
                                    </div>
                                </div> : <></>}
                                {getSinglePost.HeadTag.length ? <div className="tab-pane fade" id="nav-headTag" role="tabpanel" aria-labelledby="nav-headTag-tab">
                                    <div className="position-relative">
                                        <div className="highlighter-header rounded-top">
                                            <span className="highlighter-heading">Head Tag</span>
                                            <CopyCode copyValue={getSinglePost.HeadTag} setStateCopied={setHeadTagCopied} />
                                        </div>
                                        {headTagCopied ? <span className="content-Copied"><Check />Copied</span> : null}

                                        <CodeHighlighterEditor
                                            value={getSinglePost.HeadTag}
                                            mode={"xml"}
                                            readonly={true}
                                        />
                                    </div>
                                </div> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }
    </>
}

export default observer(SinglePost);