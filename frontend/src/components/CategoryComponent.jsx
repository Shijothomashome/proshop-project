// CategoryComponent.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const CategoryComponent = ({ categories }) => {
  return (
    <Row className="mb-4 shadow-none ">
      <Col>
        <Card className="h-100 rounded-0 shadow-none ">
          <Card.Body>
            <Card.Title className="mb-3">Shop by Categories</Card.Title>
            <ul className="list-unstyled">
              {categories.map((category) => (
                <li key={category} className="mb-2 d-inline-block me-1">
                  <Link
                    to={`/?category=${category}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {category}
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

export default CategoryComponent;
