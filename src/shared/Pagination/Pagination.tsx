interface IProps {
    totalPages: number;
    currentPage: number;
    onPageChanged: (currentPage: number) => void;
    disablePagination: boolean;
}

const Pagination = (props: IProps) => {
    const { totalPages, onPageChanged, disablePagination, currentPage } = props;
    let pagination: Array<React.ReactElement> = [];

    const getChangedPageNumber = (page: number) => {
        return Math.max(1, Math.min(page, totalPages));
    }

    pagination.push(
        <li className="page-item" key={pagination.length}><button className="page-link" onClick={() => onPageChanged(getChangedPageNumber(currentPage - 1))} disabled={disablePagination}>Previous</button></li>
    )

    for (let i = 1; i <= (totalPages <= 4 ? totalPages : 4); i++) {
        pagination.push(
            <li className={`page-item ${i === currentPage? 'active': ''}`} key={i}><button className="page-link rounded-2" onClick={() => onPageChanged(getChangedPageNumber(i))} disabled={disablePagination}>{i}</button></li>
        )
    }
    if (totalPages > 4) {
        pagination.push(
            <span className="mx-3 fs-6" key={pagination.length}>...</span>
        )
        pagination.push(
            <li className={`page-item ${totalPages === currentPage? 'active': ''}`} key={pagination.length}><button className="page-link rounded-2" onClick={() => onPageChanged(getChangedPageNumber(totalPages))} disabled={disablePagination}>{totalPages}</button></li>
        )
    }

    pagination.push(
        <li className="page-item" key={pagination.length}><button className="page-link" onClick={() => onPageChanged(getChangedPageNumber(currentPage + 1))} disabled={disablePagination}>Next</button></li>
    )

    return <>
        {
            pagination.map(element => element)
        }
    </>
}

export default Pagination;