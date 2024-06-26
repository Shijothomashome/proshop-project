import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';
import {useNavigate} from 'react-router-dom'
import SearchBox from './SearchBox';
import { clearCartCredentials } from '../slices/cartSlice';

const Header = () => {
  // Subscribing to the store
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAPICall] = useLogoutMutation();

  const logoutHandler = async() => {
    try {
      await logoutAPICall().unwrap();
      dispatch(clearCredentials());
      dispatch(clearCartCredentials());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <a href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Navbar.Brand>
              <img src={logo} alt="Proshop logo" />
              ProShop
            </Navbar.Brand>
          </a>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link><FaShoppingCart /> Cart
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg='success'
                        style={{ marginLeft: '5px' }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><FaUser /> Sign In</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header