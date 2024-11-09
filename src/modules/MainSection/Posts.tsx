
'use client'
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { initialPageLimit } from "../../constants/pageLimitOptions.constant";
import { useStore } from "../../contexts/StoreProvider";
import { getTrimmedName } from "../../helpers/links.helper";
import { IPageInfo } from "../../models/IPageInfo";
import BetweenPostsAd from "../../shared/Ads/BetweenPostsAd";
import Preview from "../../shared/CodePreview/Preview";
import PageLoader from "../../shared/Loader/PageLoader";
import Pagination from "../../shared/Pagination/Pagination";

interface IProps {
    className: string;
}

const Posts = (props: IProps) => {
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const params = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isInFullScreen, setIsInFullScreen] = useState(false);

    const categoryName = params.categoryName ? (params.categoryName as string).replaceAll('-', ' ') : '';
    const tagName = params.tagName ? (params.tagName as string).replaceAll('-', ' ') : '';

    useEffect(() => {
        if (isLinkCopied) {
            toast.success('Link copied successfully');
            setIsLinkCopied(false);
        }
    }, [isLinkCopied]);

    const { postsStore } = useStore();
    const { getAllPosts, allPosts, inProgress, error, reset, getCategoryDescription, postsData, getTagDescription, searchText, currentPageInfo, setCurrentPageInfo } = postsStore;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);
    const [pageInfo, setPageInfo] = useState<IPageInfo>({
        currentPage: currentPageInfo,
        totalPages: 1
    });

    useEffect(() => {
        setPageInfo(pageInfo => ({ ...pageInfo, currentPage: currentPageInfo }));
    }, [currentPageInfo]);

    useEffect(() => {
        setCurrentPageInfo(pageInfo.currentPage)
    }, [pageInfo.currentPage]);

    const [disablePagination, setDisablePagination] = useState<boolean>(false);

    useEffect(() => {
        setDisablePagination(true);
        getAllPosts(pageInfo.currentPage, pageLimit, searchText, categoryName, tagName);
    }, [getAllPosts, pageInfo.currentPage, pageLimit, searchText, categoryName, tagName]);

    useEffect(() => {
        setPageInfo(pageInfo => ({ ...pageInfo, totalPages: postsData?.TotalPages }));
        setDisablePagination(false);
    }, [allPosts, postsData.TotalPages]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
    }, [error, reset]);

    // const onSearchTextChanged = (text: string) => { };

    // const onPageLimitChanged = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    //     setPageLimit(parseInt(evt.target.value));
    // }

    const onPageChanged = useCallback((pageNumber: number) => {
        setPageInfo(pageInfo => ({ ...pageInfo, currentPage: pageNumber }));
    }, []);

    useEffect(() => {
        onPageChanged(1);
    }, [pageLimit, onPageChanged])

    const totalPages = pageInfo.totalPages > 0 ? pageInfo.totalPages : 1;

    return <>

        {/* <div className="header-search">
            <div className="mx-auto" style={{ maxWidth: '500px' }}>
                <SearchField onSearchTextChanged={onSearchTextChanged} />
            </div>
        </div> */}

        <div id="main-content" className={`${isInFullScreen ? 'fullscreen' : ''}`}>
            <div className="container">

                {
                    inProgress ? <PageLoader /> : <>
                        {
                            <>
                                {categoryName?.length ? <div className="p-3 bg-white mb-3">
                                    <h1 className="text-capitalize">{categoryName}</h1>
                                    <div>{getCategoryDescription}</div>
                                </div> : <></>}
                                {tagName?.length ? <div className="p-3 bg-white mb-3">
                                    <h1 className="text-capitalize">{tagName}</h1>
                                    <div>{getTagDescription}</div>
                                </div> : <></>}
                                <>
                                    <div className={props.className}>
                                        <div className="row">
                                            {allPosts && allPosts.map(post => {
                                                const trimmedPostTitle = getTrimmedName(post.Title);

                                                // const postLink = `${window.location.origin}/${trimmedPostTitle}`

                                                return <Fragment key={post.Id}>
                                                    <div className="col-12 my-3">
                                                        <div className="post-preview shadow-sm">
                                                            <div className='post-preview-header'>
                                                                <h2 className="post-title">
                                                                    <Link href={`/${trimmedPostTitle}`} title={post.Title}>
                                                                        {post.Title}
                                                                    </Link>
                                                                </h2>
                                                                <div className="d-flex align-items-center gap-3 ms-auto ms-auto">
                                                                    <Link href={`/${trimmedPostTitle}`} className="btn btn-sm btn-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m178.77-479.38 162.31 162.3q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L119.15-454.69q-5.61-5.62-7.92-11.85-2.31-6.23-2.31-13.46t2.31-13.46q2.31-6.23 7.92-11.85l179.77-179.77q8.93-8.92 21.2-9.11 12.26-.19 21.57 9.11 9.31 9.31 9.31 21.39 0 12.07-9.31 21.38L178.77-479.38Zm602.46-1.24-162.31-162.3q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69l179.77 179.77q5.61 5.62 7.92 11.85 2.31 6.23 2.31 13.46t-2.31 13.46q-2.31 6.23-7.92 11.85L661.08-274.92q-8.93 8.92-20.89 8.8-11.96-.11-21.27-9.42-9.3-9.31-9.3-21.38 0-12.08 9.3-21.39l162.31-162.31Z" /></svg> Get Code
                                                                    </Link>
                                                                    {/* <SocialShare linkToCopy={window.location.href} setIsLinkCopied={setIsLinkCopied} /> */}
                                                                </div>
                                                            </div>
                                                            <div className='post-preview-body'>
                                                                <Preview
                                                                    htmlCode={post.HtmlCode}
                                                                    cssCode={post.CssCode}
                                                                    jsCode={post.JsCode}
                                                                    headTag={post.HeadTag}
                                                                    title={post.Title}
                                                                />
                                                            </div>
                                                            {/* <div className='post-preview-footer'>
                                                                <SocialShare linkToCopy={window.location.href} setIsLinkCopied={setIsLinkCopied} />
                                                                <Link to={`/${trimmedPostTitle}`} className="btn btn-sm get-code-btn">
                                                                    Get Code
                                                                </Link>
                                                            </div> */}
                                                        </div>
                                                    </div>

                                                    <div className="ad-box text-center my-2">
                                                        <BetweenPostsAd />
                                                    </div>

                                                </Fragment>
                                            })}
                                        </div>
                                    </div>
                                </>
                            </>
                        }
                    </>
                }
            </div>
        </div>

        <div className="col-12">
            <div className="mx-auto d-table mt-5 bg-white p-2 rounded-5 shadow-sm">
                <ul className="pagination">
                    <Pagination onPageChanged={onPageChanged} totalPages={totalPages} currentPage={pageInfo.currentPage} disablePagination={disablePagination} />
                </ul>
            </div>
        </div>

    </>
}

export default observer(Posts);