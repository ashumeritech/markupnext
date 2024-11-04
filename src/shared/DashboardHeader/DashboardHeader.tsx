import Logo from '../../assets/Images/markuptag-logo-4.png';
import SearchField from '../SearchField/SearchField';
import './DashboardHeader.css';
const Header = () => {
    function onSearchTextChanged(text: string): void {
        throw new Error('Function not implemented.');
    }

    return <header>

        <nav className="navbar navbar-expand-sm bg-white navbar-light border-bottom fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt='logo' className="header-logo" style={{maxWidth: "200px"}}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link text-dark d-flex align-items-center" href="/"><i className="bi bi-house-door me-2 fs-5"></i> Visit Site</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark d-flex align-items-center" href="/"><i className="bi bi-box-arrow-right me-2 fs-5"></i> Logout</a>
                    </li>
                </ul>
                {/* <div className="d-flex">
                    <SearchField onSearchTextChanged={onSearchTextChanged} />
                </div> */}
                </div>
            </div>
        </nav>            
        
    </header>
}

export default Header;