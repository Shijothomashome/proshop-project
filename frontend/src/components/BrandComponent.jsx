// BrandComponent.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const BrandComponent = ({ brands }) => {
  return (
    <Row className="mb-4">
      <Col>
        <Card className="h-100 rounded-0 ">
          <Card.Body>
            <Card.Title className="mb-3">Shop by Brands</Card.Title>
            <ul className="list-unstyled">
              {brands.map((brand) => (
                <li key={brand} className="mb-2 d-inline-block me-1 ">
                  <Link
                    to={`/?brand=${brand}`}
                    className="btn btn-outline-warning  btn-sm"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BrandComponent;
