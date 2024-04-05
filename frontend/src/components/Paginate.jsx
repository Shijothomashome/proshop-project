

import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  // Calculate the start and end page numbers for the pagination items
  let startPage, endPage;
  if (pages <= 5) {
    // Less than 5 total pages, show all
    startPage = 1;
    endPage = pages;
  } else {
    // More than 5 total pages, calculate start and end pages
    if (page <= 2) {
      startPage = 1;
      endPage = 3;
    } else if (page + 2 >= pages) {
      startPage = pages - 2;
      endPage = pages;
    } else {
      startPage = page - 1;
      endPage = page + 2;
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {page > 1 && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page - 1}`
                  : `/page/${page - 1}`
                : `/admin/productlist/${page - 1}`
            }
          >
            <Pagination.Prev />
          </LinkContainer>
        )}
        {[...Array(endPage + 1 - startPage).keys()].map((x) => (
          <LinkContainer
            key={x + startPage}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + startPage}`
                  : `/page/${x + startPage}`
                : `/admin/productlist/${x + startPage}`
            }
          >
            <Pagination.Item active={x + startPage === page}>
              {x + startPage}
            </Pagination.Item>
          </LinkContainer>
        ))}
        {page < pages && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`
            }
          >
            <Pagination.Next />
          </LinkContainer>
        )}
      </Pagination>
    )
  );
};

export default Paginate;
