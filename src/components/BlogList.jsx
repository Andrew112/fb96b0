import React, { useState } from "react";

import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import blogs from "../data/blogs.json";
const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const currentPaginationData = blogs.posts;

  return (
    <div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageSize={rowsPerPage}
        onPageSizeOptionChange={setRowsPerPage}
        totalCount={blogs.posts.length}
        pageSizeOptions={PAGE_SIZES}
      />
      <ul
        // Do not modify the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData
          ?.slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
          ?.map((blog) => (
            <BlogPost
              key={blog.id}
              author={blog.author}
              title={blog.title}
              excerpt={blog.excerpt}
              featureImage={blog.image}
            />
          ))}
      </ul>
    </div>
  );
}

export default BlogList;
