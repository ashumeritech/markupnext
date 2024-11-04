import { useCallback, useEffect, useState } from 'react';
import Logo from '../../assets/Images/markuptag-logo-4.png';
import { useStore } from '../../contexts/StoreProvider';
import SearchField from '../SearchField/SearchField';
import './Header.module.css';
import { initialPageLimit } from '../../constants/pageLimitOptions.constant';
import Image from 'next/image';
const Header = () => {

    const {postsStore}=useStore();
    const {getAllPosts,setCurrentPageInfo}=postsStore;
const [searchText,setSearchText]=useState('');
    const CallGetAllPostApi=()=>useCallback(()=>{
        getAllPosts(1,initialPageLimit,searchText);
    },[getAllPosts]);

    const onSearchTextChanged= (text: string)=> {setCurrentPageInfo(1); getAllPosts(1,initialPageLimit,text)};

    return <header>


        <nav className="navbar fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <Image src={Logo} alt='logo' className="header-logo img-fluid" />
                </a>

                <div className='header-search'>
                    <SearchField onSearchTextChanged={onSearchTextChanged} />
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">See More</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="https://www.markuptag.com/">UI Material</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    </header>
}

export default Header;