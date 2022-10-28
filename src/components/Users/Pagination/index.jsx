import React, { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ErrorBoundary from "../../ErrorBoundary";
import "./index.css";
import useSWR from "swr";
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

  if (error) {
    return <span>An error occured while processing your request</span>;
  }

  if (!fetchedData) {
    return (
      <div>
        <Spinner /> Fetching data...
      </div>
    );
  }

  return (
    <>
      <div className="Users">
        {currentItems?.map((item, index) => {
          return (
            <div class="card">
              <img
                src={item.image}
                alt={item.login.username}
                className="card-img-top"
              />
              <div class="card-body">
                <h5 className="card-title">Username: {item.login.username}</h5>
                <h6 className="card-subtitle">Email: {item.email}</h6>
                <p className="card-title">Gender: {item.gender}</p>
              </div>
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
    </>
  );
}

export default Pagination;
