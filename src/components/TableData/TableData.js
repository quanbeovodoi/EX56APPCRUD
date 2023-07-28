import "rsuite/dist/rsuite.min.css";
import { Button, Table } from "rsuite";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)
const { Column, HeaderCell, Cell } = Table;
function TableData({data,activeForm,checkIdEdit,deleteCustomer}) {
  // console.log(data);
  const [dataCurrent,setDataCurrent] = useState(data.slice(0).reverse());
  
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
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column minWidth={100} flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          
          <Column width={120}>
            <HeaderCell>Phone</HeaderCell>
            <Cell dataKey="phone" />
          </Column>

          <Column width={150}>
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column minWidth={150} flexGrow={1}>
            <HeaderCell>Township</HeaderCell>
            <Cell dataKey="township" />
          </Column>

          <Column width={150}>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column flexGrow={1} minWidth={240}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={120}>
            <HeaderCell>Event</HeaderCell>
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
