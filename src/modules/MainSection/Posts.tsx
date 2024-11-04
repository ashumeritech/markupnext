
'use client'
import { observer } from "mobx-react-lite";
import { useStore } from "../../contexts/StoreProvider";
import { Fragment, useCallback, useEffect, useState } from "react";
import { PageLimitOptions, initialPageLimit } from "../../constants/pageLimitOptions.constant";
import { IPageInfo } from "../../models/IPageInfo";
import PageLoader from "../../shared/Loader/PageLoader";
import { toast } from "react-toastify";
import SearchField from "../../shared/SearchField/SearchField";
import SocialShare from "../../shared/SocialShare/SocialShare";
import OtherFeatures from "../../shared/OtherFeatures/OtherFeatures";
import Pagination from "../../shared/Pagination/Pagination";
import { getTrimmedName } from "../../helpers/links.helper";
import Preview from "../../shared/CodePreview/Preview";
import BetweenPostsAd from "../../shared/Ads/BetweenPostsAd";
import  ReactComponent  from '../../assets/Images/Svg/code.svg';
import Link from "next/link";
import { useParams } from "next/navigation";

interface IProps {
    className: string;
}

const Posts = (props: IProps) => {
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const params = useParams();

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
    const { getAllPosts, allPosts, inProgress, error, reset, getCategoryDescription, postsData, getTagDescription,searchText,currentPageInfo,setCurrentPageInfo } = postsStore;

    const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);
    const [pageInfo, setPageInfo] = useState<IPageInfo>({
        currentPage: currentPageInfo,
        totalPages: 1
    });

    useEffect(() => {
        setPageInfo(pageInfo => ({ ...pageInfo, currentPage: currentPageInfo }));
    },[currentPageInfo]);
    
    useEffect(() => {
        setCurrentPageInfo(pageInfo.currentPage)
    },[pageInfo.currentPage]);

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

    const onSearchTextChanged = (text: string) => {  };

    const onPageLimitChanged = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setPageLimit(parseInt(evt.target.value));
    }

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

                                                const postLink = `${window.location.origin}/${trimmedPostTitle}`

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
                                                                        <ReactComponent />Get Code
                                                                    </Link>
                                                                    <SocialShare linkToCopy={window.location.href} setIsLinkCopied={setIsLinkCopied} />
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