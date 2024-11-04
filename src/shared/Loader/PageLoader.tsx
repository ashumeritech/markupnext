const PageLoader = () => {
    return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        // <div className="loader-backdrop d-flex justify-content-center text-secondary mt-5">
        //     <span
        //         aria-hidden="true"
        //         style={{ color: "#0078d4" }}
        //     >
        //         page loader
        //     </span>
        // </div>
    )
};

export default PageLoader;