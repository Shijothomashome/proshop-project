import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const PageNotFound = ({ message }) => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          {message === "Page not found" ? (
            <>
              <h1 className="text-center">404 - {message}</h1>
              <p className="text-center">
                "Oops! The page you are looking for does not exist."
              </p>
            </>
          ) : (
            <>
              
              <h1 className="text-center"><FaShoppingCart icon="fa-solid fa-ban" /> {message}</h1>
              
            </>
          )}

          <div className="text-center">
            <Link to="/">
              <Button variant="primary">Go Home</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
