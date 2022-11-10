import "../css/pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS } from "../hooks/usePagination";

import PropTypes from "prop-types";
import React from "react";
import { nanoid } from "nanoid";

function Pagination({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
  pageSizeOptions,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange((prev) => prev + 1);
  };

  const onPrevious = () => {
    onPageChange((prev) => prev - 1);
  };

  return (
    <ul
      className="wrapper"
      // Do not modify the aria-label below, it is used for Hatchways automation.
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          // Do not modify the aria-label below, it is used for Hatchways automation.
          aria-label="Goto previous page"
          onClick={onPrevious}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) =>  {
        const selectedItem = pageNumber === currentPage + 1;
        const key = nanoid();

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li key={key} className="paginationItem" aria-current="false">
            <button
              type="button"
              style={{
                background: selectedItem ? "black" : "white",
                color: selectedItem ? "white" : "black",
              }}
              // Do not modify the aria-label below, it is used for Hatchways automation.
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => onPageChange(pageNumber - 1)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          // Do not modify the aria-label below, it is used for Hatchways automation.
          aria-label="Goto next page"
          onClick={onNext}
          disabled={currentPage >= Math.ceil(totalCount / pageSize) - 1}
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        // Do not modify the aria-label below, it is used for Hatchways automation.
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => {
          onPageSizeOptionChange(parseInt(e.target.value));
          onPageChange(0);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
};

export default Pagination;
