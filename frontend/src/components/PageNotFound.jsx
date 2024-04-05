import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">404 - Page Not Found</h1>
          <p className="text-center">Oops! The page you are looking for does not exist.</p>
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
