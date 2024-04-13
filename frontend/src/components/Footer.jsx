import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from 'react-toastify'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleSubscribeToNewsletter = (e) => {
    e.preventDefault();
    toast.success('you are subscribed to our newsletter')
  }
  return (
    <footer  className="mt-5 bg-secondary-subtle ">
      <Container>
        <Row>
          <Col md={4} className="text-center py-3">
            <h5>Follow Us</h5>
            <div >
              <Link to="https://www.facebook.com" style={{marginRight:'15px'}}>
                <FaFacebook size="2em" />
              </Link>
              <Link to="https://www.twitter.com" style={{marginRight:'15px'}}>
                <FaTwitter size="2em" />
              </Link>
              <Link to="https://www.instagram.com" style={{marginRight:'15px'}}>
                <FaInstagram size="2em" />
              </Link>
            </div>
            <h5 className="mt-4">Contact Us</h5>
            <p>Email: info@proshop.com</p>
            <p>Phone: +91 7034436073</p>
          </Col>
          <Col md={4} className="text-center py-3">
            

            <h5>About ProShop</h5>
            <small>
              Your one-stop shop for electronics, fashion, home goods, and more. Experience convenience at its best!
            </small>
            <p className="mt-4">ProShop &copy; {currentYear}</p>
          </Col>
          <Col md={4} className="text-center py-3">
            <h5>Subscribe to our Newsletter</h5>
            <p>Stay updated with our latest news and offers.</p>
            <Form className="d-flex flex-row align-items-center justify-content-center outline-danger " onSubmit={handleSubscribeToNewsletter}>
              <Form.Group controlId="formBasicEmail" className="mr-2 mb-0 ">
                <Form.Control type="email" className="rounded-0 outline-0 border-0" placeholder="Enter your email"  />
              </Form.Group>
              <Button variant="primary" type="submit" className="rounded-0 border-0 ">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
