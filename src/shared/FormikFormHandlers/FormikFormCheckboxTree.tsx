import { useField } from "formik";
import FormikFormErrorHandler from './FormikFormErrorHandler';
import { ITreeView } from "../../models/ITreeView";
import { useEffect, useState } from "react";

interface IProps {
    className: string;
    name: string;
    onBlur: () => void;
    onChange: () => void;
    value: string;
    disabled: boolean;
    tree: Array<ITreeView>;
    label: string;
}

const FormikFormCheckboxTree = (props: IProps) => {
    const [field, meta, helpers] = useField(props);
    // const errorClass = `${(meta.error && meta.touched) ? 'error' : ''}`;
    const { label, tree, name } = props;
    const fieldValue: Array<number> = field.value;

    const [filteredTree, setFilteredTree] = useState(tree);

    useEffect(() => {
        setFilteredTree(tree);
    }, [tree]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            helpers.setValue([...fieldValue, id]);
        }
        else {
            helpers.setValue([...fieldValue.filter(value => value !== id)]);
        }
    }

    const Tree = ({ treeData }: { treeData: ITreeView[] | null }) => {
        return <div>
            {
                treeData?.map(data => {
                    return <TreeNode item={data} key={data.Id} />
                })
            }
        </div>
    }

    const TreeNode = ({ item }: { item: ITreeView }) => {
        return <div style={{ marginLeft: item.ParentId === null ? 0 : 20 }}>
            <input type="checkbox" checked={fieldValue.includes(item.Id)} onChange={(e) => handleChange(e, item.Id)} />
            <span>{item.Name}</span>
            <Tree treeData={item.children} />
        </div>
    }

    const [searchData, setSearchData] = useState('');

    const filterNodes = (query: string, nodes: Array<ITreeView>) => {
        return nodes.reduce((acc: Array<ITreeView>, item: ITreeView) => {
            if (item.children?.length) {
                const filtered: ITreeView[] = filterNodes(query, item.children)
                if (filtered.length) return [...acc, { ...item, children: filtered }]
            }

            const itemWithoutChildren = {...item, children: null}
            return item.Name?.toLowerCase().includes(query.toLowerCase()) ? [...acc, itemWithoutChildren] : acc
        }, [])
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
        if (!e.target.value.length) {
            setFilteredTree(tree);
            return;
        }

        const query = e.target.value.toString().toLowerCase();
        let treeData = [...tree];
        const result = filterNodes(query, treeData);

        setFilteredTree(result);
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
                                {/* <span className="input-group-text"><span className="material-symbols-outlined fs-5">search</span></span> */}
                            </div>

                            <Tree treeData={filteredTree} />
                        </div>
                    </div>
                    <FormikFormErrorHandler meta={meta} />
                </div>
            </div>
        </>
    );
};

export default FormikFormCheckboxTree;