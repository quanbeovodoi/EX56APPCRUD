import "rsuite/dist/rsuite.min.css";
import { Button, Table } from "rsuite";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../api/dataContext";
const cx = classNames.bind(styles)
const { Column, HeaderCell, Cell } = Table;
function TableData({data,activeForm,checkIdEdit,deleteCustomer}) {
  // console.log(data);
  const [dataCurrent,setDataCurrent] = useState(data.slice(0).reverse());
  const{languagesData} = useContext(dataContext)
    const tableContent = languagesData.table;
  useEffect(()=>{
    setDataCurrent(data.slice(0));
  },[data]);
  const findData = (dataId)=>{
    return dataCurrent.find(element => element.id === dataId)
  }
  return (
    <>
      <div className={cx('tableContent')}>
        <Table
          height={420}
          data={dataCurrent}
          bordered
          cellBordered
        >
          <Column width={50} align="center">
            <HeaderCell>{tableContent.id}</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column minWidth={100} flexGrow={1}>
            <HeaderCell>{tableContent.name}</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          
          <Column width={120}>
            <HeaderCell>{tableContent.phone}</HeaderCell>
            <Cell dataKey="phone" />
          </Column>

          <Column width={150}>
            <HeaderCell>{tableContent.date}</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column minWidth={150} flexGrow={1}>
            <HeaderCell>{tableContent.township}</HeaderCell>
            <Cell dataKey="township" />
          </Column>

          <Column width={150}>
            <HeaderCell>{tableContent.city}</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column flexGrow={1} minWidth={240}>
            <HeaderCell>{tableContent.email} </HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={120}>
            <HeaderCell>{tableContent.event}</HeaderCell>
            <Cell>
              {(rowData) => (
                <>
                  <Button
                    className={cx("btn")}
                    color="blue"
                    appearance="primary"
                    size="sm"
                    onClick={() => {
                      checkIdEdit(findData(rowData.id));
                      activeForm(true)
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className={cx("btn")}
                    color="red"
                    appearance="primary"
                    size="sm"
                    onClick={() => {deleteCustomer(rowData.id)}}
                  >
                    <TrashIcon />
                  </Button>
                </>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </>
  );
}

export default TableData;
