import React, { useEffect, useState } from 'react';
import FormikFormErrorHandler from './FormikFormErrorHandler';
import { useField } from 'formik';

type Option = {
    Id: string | number;
    Name: string;
};

interface IProps {
    children: React.ReactNode;
    className: string;
    name: string;
    onBlur: () => void;
    onChange: () => void;
    placeholder: string;
    value: string;
    disabled: boolean;
    keyField: string;
    label: string;
    searchEnabled?: boolean;
    typeofoptionid: string;
    options: Option[];
}

const FormikFormDropdownTable = (props: IProps) => {
    const { disabled, label, name } = props;
    const [field, meta, helpers] = useField(props);
    const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;

    const { typeofoptionid } = props;
    const [selectAll, setSelectAll] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(props.options);
    const optionIds = filteredOptions.map(option => option.Id);

    useEffect(() => {
        setFilteredOptions(props.options);
    }, [props.options])

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList: Array<string | number> = [];
        if (event.target.checked) {
            updatedList = [...optionIds];
        }
        else {
            updatedList = [];
        }
        helpers.setValue(updatedList);
    }

    useEffect(() => {
        if (optionIds.length && field.value.length === optionIds.length) setSelectAll(true);
        else setSelectAll(false);
    }, [field.value, optionIds.length]);

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
        if (!e.target.value.length) {
            setFilteredOptions(props.options);
            return;
        }

        const options = props.options.filter((option) => option.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredOptions(options);
    }

    return (
        <>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button shadow-none bg-white text-dark" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${name}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseOne${name}`}>
                        {label}
                    </button>
                    </h2>
                    <div id={`panelsStayOpen-collapseOne${name}`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <div className="input-group input-group-sm">
                                <input
                                    name="searchData"
                                    value={searchData}
                                    placeholder="Search"
                                    onChange={searchHandler}
                                    type="text"
                                    data-testid='searchInput'
                                    className="form-control"
                                />
                                <span className="input-group-text"><span className="material-symbols-outlined fs-5">search</span></span>                                        
                            </div>


                            <ul className="list-group mt-2 overflow-auto" style={{maxHeight: "200px"}}>
                                <li className="list-group-item border-0 p-0">
                                    <label>
                                        <input type='checkbox' className='me-1' checked={selectAll} onChange={handleSelectAllChange} />Select All
                                    </label>
                                </li>
                                {filteredOptions.map((option: Option) => (
                                    <li className="list-group-item border-0 p-0" key={option.Id}>
                                        <label>
                                            <input
                                                {...field}
                                                className={props.className + ' me-1 ' + errorClass}
                                                type="checkbox"
                                                value={option.Id}
                                                checked={field.value.includes(option.Id)}
                                                data-testid={option.Id}
                                                onChange={event => {
                                                    let updatedList = [];
                                                    if (event.target.checked) {
                                                        typeofoptionid === 'number' ? updatedList = [...field.value, parseInt(event.target.value)] : updatedList = [...field.value.filter((option: string) => option !== ''), event.target.value]
                                                    }
                                                    else {
                                                        updatedList = [...field.value];
                                                        typeofoptionid === 'number' ? updatedList.splice(field.value.indexOf(parseInt(event.target.value)), 1) : updatedList.splice(field.value.indexOf(event.target.value), 1);
                                                    }
                                                    helpers.setValue(updatedList);
                                                }}
                                            />
                                            {option.Name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <FormikFormErrorHandler meta={meta} />
        </>
    );
};

export default FormikFormDropdownTable;