import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import PageNotFound from "../components/PageNotFound.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [data]);

  return ( 
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
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

          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row className="d-grid justify-content-center">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
