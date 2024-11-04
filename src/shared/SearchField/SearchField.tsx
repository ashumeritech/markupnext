import React, { useState } from 'react';

interface IProps {
    onSearchTextChanged: (text: string) => void;
}

const SearchField = (props: IProps) => {
    const [searchData, setSearchData] = useState('');
    const { onSearchTextChanged } = props;

    const onInputChanged = (e: any) => {
        setSearchData(e.target.value);
    }

    const handleCurrentInput = (e: any) => {
        if(searchData.length !== 0) {
            onSearchTextChanged(searchData);
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter' || searchData.length === 0) {
            onSearchTextChanged(searchData);
        }
    }
    
    return <div className="input-group">
            <input type="text" name="searchData" className="form-control" placeholder={'Search'} value={searchData} onChange={onInputChanged} onKeyUp={handleKeyUp} data-testid='searchInput' />
            <button className="btn border" type="button" onClick={handleCurrentInput} data-testid='searchDataBtn'>
                <i className="bi bi-search"></i>
            </button>
        </div>
}

export default SearchField;