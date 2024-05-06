import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate className="flex justify-center gap-4 items-center m-5"
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel={
        <FontAwesomeIcon icon={faChevronLeft} />
      }
      nextLabel={
        <FontAwesomeIcon icon={faChevronRight} />
      }
    />
  );
};

export default Pagination;
