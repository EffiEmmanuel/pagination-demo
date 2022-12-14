import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import useSWR from "swr";
import ErrorBoundary from "../../ErrorBoundary";
import Spinner from "../../Spinner";

function Pagination(props) {
  const initialData = props.data;
  const [data, setData] = useState(initialData);
  console.log("DATA FROM PAGINATION:", data);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
    setData(props.data);
  }, [itemOffset, props.data, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const { fetchedData = data, error } = useSWR(props.endpoint);

  // if (error) {
  //   return <span>An error occured while processing your request</span>;
  // }

  if (!fetchedData) {
    return (
      <div>
        <Spinner /> Fetching data...
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary>
        <div className="me">
          {currentItems?.map((item, index) => {
            return (
              <div class="card">
                <div class="card-body">
                  <h5 className="card-title">ID: {item.id}</h5>
                  <p className="card-title">Repository: {item.name}</p>

                  {/* Links to a 404 PAGE */}
                  <Link
                    className="btn btn-dark btn-primary"
                    to={`repositories/${item.name}`}
                  >
                    View Repo
                  </Link>
                </div>

                <Outlet />
              </div>
            );
          })}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page=item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </ErrorBoundary>
    </>
  );
}

export default Pagination;
