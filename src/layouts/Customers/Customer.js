import { useContext, useEffect, useState } from "react";
import TableData from "../../components/TableData/TableData";
import FormAdd from "../../components/FormAdd/FormAdd";
import styles from "./Customer.module.scss";
import classNames from "classnames/bind";
import { Modal } from "rsuite";
import { dataContext } from "../../api/dataContext";
import FormEdit from "../../components/FormEdit/FormEdit";
import Pagination from "../../components/Pagination/Paginaiton";
import FilterForm from "../../components/FilterForm/FilterForm";
const cx = classNames.bind(styles);
function Customer() {
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const { customersData, addToCustomer, reRenderData, DeleteToCutomer,filterCustomer} =
    useContext(dataContext);
  const [idEdit, setIdEdit] = useState(null);
  const [isFilter,setIsFilter] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const sliceData = (start, end) => {
    // console.log("start:", start, "End:", end);
    const dataReversed = customersData.slice(0).reverse();
    return dataReversed.slice(start, end);
  };
  useEffect(() => {
    setCurrentPage(0);
  }, [customersData,itemPerPage]);
  const submitForm = (values) => {
    addToCustomer(values);
  };
  const updateData = () => {
    reRenderData();
  };
  const openForm = () => {
    setShowForm(true);
  };
  const offForm = () => {
    setShowForm(false);
    setShowFormEdit(false);
  };
  const deleteItem = (id) => {
    DeleteToCutomer(id);
  };
  // console.log(itemPerPage);
  return (
    <>
      {showForm ? (
        <Modal open={showForm}>
          <FormAdd
            title={"Thêm mới"}
            onSubmit={(values) => submitForm(values)}
            onCancel={() => offForm()}
          />
        </Modal>
      ) : (
        ""
      )}
      {showFormEdit ? (
        <Modal open={showFormEdit}>
          <FormEdit
            title={"Chỉnh sửa"}
            idEdit={idEdit}
            onSubmit={() => updateData()}
            onCancel={() => offForm()}
          />
        </Modal>
      ) : (
        ""
      )}
      <div className="content_page">
        <div className="box_list">
          <div className="title font-bold">
            <h2>Danh sách khách hàng</h2>
          </div>
          <div className="ext">
            <div className="search_bar">
              <input
                type="text"
                name="search"
                id="searchBar"
                placeholder="search...."
              />
              <div className="icon-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                </svg>
              </div>
            </div>
            <div className="btn-event">
              <button
                className="btn primary text-base font-semibold"
                id="add_customer"
                onClick={() => openForm()}
              >
                Thêm mới
              </button>
              <button
                className="btn transparent text-base font-semibold"
                id="filter_customer"
                onClick={() => {
                  setIsFilter(!isFilter)
                  reRenderData()
                }}
              >
                {isFilter?'Ẩn bộ lọc': 'Bộ lọc'}
              </button>
            </div>
          </div>
          <div className="filter" id="filter">
            {isFilter?<FilterForm filterCustomer={(value)=>filterCustomer(value)} />:''}
          </div>
          <div className="tableData">
              <TableData
                data={sliceData(
                  Number(itemPerPage) * Number(currentPage),
                  Number(itemPerPage) * Number(currentPage) +  Number(itemPerPage)
                )}
                activeForm={setShowFormEdit}
                checkIdEdit={setIdEdit}
                deleteCustomer={deleteItem}
              />
          </div>
          <Pagination
            changeCurrPage={(value) => setCurrentPage(value)}
            itemInPage = {itemPerPage}
            maxPages={Math.floor((customersData.length-1) / itemPerPage)}
            itemPerPage={setItemPerPage}
            start = {Number(itemPerPage) * Number(currentPage)}
            end = {Number(itemPerPage) * Number(currentPage) + Number(itemPerPage)}
            dataLength = {customersData.length}
          />
        </div>
      </div>
    </>
  );
}

export default Customer;
