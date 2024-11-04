import Link from "next/link";

const DashboardLeftSidebar = () => {
    return <aside id="dashboard-left-sidebar" className="bg-white border-end">
            <ul className="list-unstyled">
                <li className="mb-1">
                    <button className="btn w-100 p-0 fw-semibold text-start btn-toggle collapsed fs-6" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                        <i className="bi bi-pin-angle me-1 fs-5"></i> Posts
                        <i className="bi bi-arrow-right float-end fs-5"></i>
                    </button>
                    <div className="collapse" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled ms-4 ps-1">
                            <li><Link href='/addPost'>Add New Post</Link></li>
                            <li><Link href='/allPosts'>All Posts</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn w-100 p-0 fw-semibold text-start btn-toggle collapsed fs-6" data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false">
                        <i className="bi bi-diagram-3 me-1 fs-5"></i> Category
                        <i className="bi bi-arrow-right float-end fs-5"></i>
                    </button>
                    <div className="collapse" id="category-collapse">
                        <ul className="btn-toggle-nav list-unstyled ms-4 ps-1">
                            <li><Link href='/addCategory'>Add New Category</Link></li>
                            <li><Link href='/allCategories'>All Categories</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn w-100 p-0 fw-semibold text-start btn-toggle collapsed fs-6" data-bs-toggle="collapse" data-bs-target="#tag-collapse" aria-expanded="false">
                        <i className="bi bi-tags me-1 fs-5"></i> Tag
                        <i className="bi bi-arrow-right float-end fs-5"></i>
                    </button>
                    <div className="collapse" id="tag-collapse">
                        <ul className="btn-toggle-nav list-unstyled ms-4 ps-1">
                            <li><Link href='/addTag'>Add New Tag</Link></li>
                            <li><Link href='/allTags'>All Tags</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
    </aside>

}

export default DashboardLeftSidebar;