import { Pagination } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";


const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();


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


  const handleNavigation = (page) => {
    if (!isAdmin) {
      // Parse the current query parameters
      const queryParams = queryString.parse(location.search);
      
      // Add or update the 'page' field with the current page number
      const newParams = { ...queryParams, page: page };
  
      // Stringify the updated query parameters
      const searchString = queryString.stringify(newParams);
  
      // Navigate to the updated URL with the modified query parameters
      navigate(`${location.pathname}?${searchString}`);
    } else {
      // Navigate to the admin page
      navigate(`/admin/productlist?page=${page}`);
    }
  };

  return (
    pages > 1 && (
      <Pagination>
        {page > 1 && (
          <Pagination.Prev onClick={() => handleNavigation(page - 1)} />
        )}
        {[...Array(endPage + 1 - startPage).keys()].map((x) => (
          <Pagination.Item
            key={x + startPage}
            active={x + startPage === page}
            onClick={() => handleNavigation(x + startPage)}
          >
            {x + startPage}
          </Pagination.Item>
        ))}
        {page < pages && (
          <Pagination.Next onClick={() => handleNavigation(page + 1)} />
        )}
      </Pagination>
    )
  );
};

export default Paginate;
