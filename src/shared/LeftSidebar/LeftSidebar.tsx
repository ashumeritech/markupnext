'use client'
import { observer } from "mobx-react-lite";
import { useStore } from "../../contexts/StoreProvider";
import { useEffect, useState } from "react";
import PageLoader from "../Loader/PageLoader";
import { toast } from "react-toastify";
import { getTrimmedName } from "../../helpers/links.helper";
import Link from "next/link";

const LeftSidebar = () => {
    const { categoryStore } = useStore();
    const { allCategories, getAllCategories, reset, error, inProgress } = categoryStore;

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    const [categories, setCategories] = useState(allCategories);

    useEffect(() => {
        setCategories(allCategories);
    }, [allCategories])

    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
    }, [error, reset]);

    const [searchData, setSearchData] = useState('');

    const onInputChanged = (e: any) => {
        setSearchData(e.target.value);
        onSearchTextChanged(e.target.value);
    }

    const onSearchTextChanged = (searchText: string) => {
        if (searchText.length) {
            const filteredCategories = allCategories.filter((category) => category.Name.toLowerCase().includes(searchText.toLowerCase()));
            setCategories(filteredCategories);
        }
        else {
            setCategories(allCategories);
        }
    }

    return <aside id="left-sidebar" className="bg-white border-end">
        <div className="mx-auto px-2">
            <div className="input-group">
                <input type="text" name="searchData" className="form-control form-control-sm" placeholder={'Search'} value={searchData} onChange={onInputChanged} data-testid='searchInput' />
                {/* <button className="btn border btn-white text-primary" type="button" data-testid='searchDataBtn'>
                    <i className="bi bi-search"></i>
                </button> */}
            </div>
        </div>

        <ul className="mt-2">
            {
                inProgress ? <PageLoader /> : categories && categories.map(category => {
                    return <li key={category.Id}>
                        <Link href={`/category/${getTrimmedName(category.Name)}`}>
                            {category.Name}
                        </Link>
                    </li>
                })
            }
        </ul>
        {/* </ul> */}
    </aside>
}

export default observer(LeftSidebar);