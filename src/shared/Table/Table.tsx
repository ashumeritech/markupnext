import Link from "next/link";
import { IIcon } from "../../models/IIcon";
import "./Table.module.css";

interface IProps {
  headerNames: Array<string>;
  dataAccessors: Array<string>;
  data: Array<object & { Id: number }>;
  customClass?: string;
  icons?: Array<IIcon>;
  selectedRows?: Array<number>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  headerIcons?: Array<IIcon>;
}

const Table = (props: IProps) => {
  const {
    headerNames,
    dataAccessors,
    customClass,
    data,
    icons,
    selectedRows,
    setSelectedRows,
    headerIcons,
  } = props;

  const rowSelectionEnabled = Boolean(selectedRows && setSelectedRows);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (selectedRows && setSelectedRows) {
      if (e.target.checked) {
        setSelectedRows([...selectedRows, value]);
      } else {
        setSelectedRows(selectedRows.filter((item) => item !== value));
      }
    }
  };

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectedRows) {
      if (e.target.checked) {
        setSelectedRows([...allIds]);
      } else {
        setSelectedRows([]);
      }
    }
  };

  const allIds = data.map((item) => item.Id);

  return (
    <>
      <div className="table-responsive w-100">
        <table className={customClass}>
          <thead>
            <tr>
              {rowSelectionEnabled && (
                <th style={{width: '40px'}}>
                  <input
                    type="checkbox"
                    checked={
                      allIds.length > 0 &&
                      allIds.length === selectedRows?.length
                    }
                    onChange={handleAllChange}
                  />
                </th>
              )}
              {headerNames.map((header) => {
                return <th key={header}>{header}</th>;
              })}
              {icons && (
                <th style={{width: '100px'}}>
                  {headerIcons &&
                    headerIcons.map((icon) => {
                      return (
                        <span
                          key={icon.icon}
                          onClick={() =>
                            !icon.isHeaderIconDisabled && icon.handler()
                          }
                        >
                          {
                            <i
                              title={icon.title}
                              className={`bi bi-${icon.icon} me-2`}
                            ></i>
                          }
                        </span>
                      );
                    })}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.Id}>
                  {rowSelectionEnabled && (
                    <td>
                      <input
                        type="checkbox"
                        value={item.Id}
                        onChange={handleChange}
                        checked={selectedRows?.includes(item.Id)}
                      />
                    </td>
                  )}
                  {dataAccessors.map((accessor) => {
                    return (
                      <td key={accessor}>{item[accessor as keyof unknown]}</td>
                    );
                  })}
                  {icons && (
                    <td>
                      {icons.map((icon) => {
                        return icon.routeTo ? (
                          <Link
                            href={icon.routeTo(item)}
                            key={icon.icon}
                            // onClick={() => icon.handler(item)}
                          >
                            {
                              <i
                                title={icon.title}
                                className={`bi bi-${icon.icon} me-2`}
                              ></i>
                            }
                          </Link>
                        ) : (
                          <span
                            key={icon.icon}
                            onClick={() => icon.handler(item)}
                            className="mx-2"
                          >
                            {
                              <i
                                title={icon.title}
                                className={`bi bi-${icon.icon} me-2`}
                              ></i>
                            }
                          </span>
                        );
                      })}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
