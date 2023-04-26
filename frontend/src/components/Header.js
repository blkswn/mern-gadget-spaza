import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropDown from 'react-bootstrap/NavDropdown'
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';


const Header = () => {


const dispatch = useDispatch()



const userLogin = useSelector(state => state.userLogin)
const { userInfo } = userLogin

const  logoutHandler = () => {
  dispatch(logout())
}

  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
            <Navbar.Brand>GadgetSpaza</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          
          <Nav className="ms-auto">

          <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>

            {userInfo ? (

              <NavDropDown title={userInfo.name} id='username'>

                <LinkContainer to='/profile'>
                  <NavDropDown.Item>Profile</NavDropDown.Item>
                </LinkContainer>
                <NavDropDown.Item onClick={logoutHandler}>Logout</NavDropDown.Item>

              </NavDropDown>

            ): ( <LinkContainer to='/login'>
            <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
            </LinkContainer> )}

            {userInfo && userInfo.isAdmin && (
              <NavDropDown title='Admin' id='adminmenu'>

              <LinkContainer to='admin/userlist'>
                <NavDropDown.Item>Users</NavDropDown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/productlist'>
                <NavDropDown.Item>Products</NavDropDown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/orderlist'>
                <NavDropDown.Item>Orders</NavDropDown.Item>
              </LinkContainer>
              

            </NavDropDown>
            )}

           
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header