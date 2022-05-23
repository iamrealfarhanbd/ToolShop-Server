import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
    return (
        <>
            <footer className="bg-dark text-light text-center text-md-left p-5">
                <Container className="footer">
                    <Row className="footerRow">
                        <h4>Footer Links</h4>
                        <Navbar bg="dark" variant="dark" expand="lg">

                            <Nav className="mx-auto ">
                                <Nav.Link as={Link} to="home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/Allproduct">Manage Inventories</Nav.Link>
                                <Nav.Link as={Link} to="Blog">Blog</Nav.Link>
                                <Nav.Link as={Link} to="About">About</Nav.Link>
                                <Nav.Link as={Link} to="myproduct">My product</Nav.Link>
                            </Nav>

                        </Navbar>
                        <p className="text-center text-secondary border-top border-secondary pt-4"> copyrights ©Ebazar WareHouse  </p>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;