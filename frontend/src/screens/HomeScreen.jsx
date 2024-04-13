import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import PageNotFound from "../components/PageNotFound.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import FilterComponent from "../components/FilterComponent.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import CategoryComponent from "../components/CategoryComponent.jsx";
import BrandComponent from "../components/BrandComponent.jsx";

const HomeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword } = useParams();
  const queryParams = queryString.parse(location.search);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || "",
    page: queryParams.page || 1,
    category: queryParams.category || "",
    brand: queryParams.brand || "",
    rating: queryParams.rating || "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [data]);

  const handleCategoryChange = (event) => {
    updateUrlParams({ category: event.target.value });
  };

  const handleBrandChange = (event) => {
    updateUrlParams({ brand: event.target.value });
  };

  const handleRatingChange = (event) => {
    updateUrlParams({ rating: event.target.value });
  };

  const handleClearFilters = () => {
    updateUrlParams({ category: "", brand: "", rating: "" });
  };

  const updateUrlParams = (params) => {
    const newParams = {
      ...queryParams,
      ...params,
      page: queryParams.page ? 1 : queryParams.page,
    };
    const searchString = queryString.stringify(newParams);
    navigate(`${location.pathname}?${searchString}`);
  };

  const homePage = !keyword && Object.keys(queryParams).length === 0;
  const nonFilterPages =
    (!keyword && Object.keys(queryParams).length === 0) ||
    (Object.keys(queryParams).length === 1 && queryParams.page !== undefined);

  return (
    <>
      {homePage || queryParams.page === "1" ? (
        <ProductCarousel />
      ) : (
        !nonFilterPages && (
          <button onClick={() => navigate("/")} className="btn btn-light mb-4">
            Go Back
          </button>
        )
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        error.status === 404 ? (
          <PageNotFound message={error?.data?.message} />
        ) : (
          <Message variant="danger">{error?.data?.message}</Message>
        )
      ) : (
        <>
          {!nonFilterPages ? (
            <Row>
              <h1 className="display-6">
                Filtered Products ({data.count}{" "}
                {data.count === 1 ? "item found" : "items found"} )
              </h1>
              <Col lg={3}>
                <FilterComponent
                  categories={data.categories}
                  brands={data.brands}
                  selectedCategory={queryParams.category}
                  selectedBrand={queryParams.brand}
                  selectedRating={queryParams.rating}
                  onCategoryChange={handleCategoryChange}
                  onBrandChange={handleBrandChange}
                  onRatingChange={handleRatingChange}
                  onClearFilters={handleClearFilters}
                />
              </Col>
              <Col lg={9}>
                <Row>
                  {data.products.map((product) => (
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          ) : (
            <>
              <CategoryComponent categories={data.categories} />
              <BrandComponent brands={data?.brands} />
              <Row>
                <h1>Latest Products</h1>
                {data.products.map((product) => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          <div className="d-flex justify-content-center mt-4">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword || ""}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
