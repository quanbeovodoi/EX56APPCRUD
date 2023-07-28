import { useState } from "react";

function Pagination({ changeCurrPage,itemInPage, itemPerPage, maxPages,start,end,dataLength}) {
  const changePage = (increase) => {
    if (increase)
      changeCurrPage((prevState) =>
        prevState + 1 < maxPages ? prevState + 1 : maxPages
      );
    else
      changeCurrPage((prevState) =>
        prevState - 1 >= 0 ? prevState - 1 : prevState
      );
  };
  return (
    <>
      <div className="pagination">
        <div className="pagination_wrapper">
          <p>Số bản ghi</p>
          <div className="filter">
            <select
              name=""
              id="filter"
              onChange={(event) => {
                const newVal = event.target.value
                itemPerPage(newVal);
              }}
              value={itemInPage}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="infoPageCurrent">{start+1}-{end>dataLength?dataLength:end} of {dataLength}</div>
          <div className="nav_page">
            <button className="prev" onClick={() => changePage(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
              </svg>
            </button>
            <button className="next" onClick={() => changePage(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
