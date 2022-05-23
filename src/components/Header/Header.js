import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Ebazar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="home">Home</Nav.Link>
                            <Nav.Link as={Link} to="Blog">Blog</Nav.Link>
                            <Nav.Link as={Link} to="About">About</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <>
                                        <Nav.Link onClick={handleSignOut} >Sign Out</Nav.Link>
                                        <Nav.Link as={Link} to="/allproduct">Manage Inventories</Nav.Link>
                                        <Nav.Link as={Link} to='addProduct' >Add Product</Nav.Link>
                                        <Nav.Link as={Link} to='myproduct' >My Product</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as={Link} to="Login">Login</Nav.Link>
                                        <Nav.Link as={Link} to="Registration">Registration</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;