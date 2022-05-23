import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import {useNavigate, useParams } from 'react-router-dom';

const HomeProductCard = ({product}) => {
    const navigate = useNavigate();
    const { productname, description, img ,_id ,price,providername,quantity} = product;
    return (
        <>
            <Col lg={4} md={6}>
                <Card className='m-2' >
                    <Card.Img variant="top" src={img} className="img-fluid " />
                    <Card.Body>
                        <Card.Title>{productname}</Card.Title>
                        <Card.Text>
                          <b>Provider Name : </b>  {providername} 
                        </Card.Text>
                        <Card.Text>
                        <b>Description:</b> {description} 
                        </Card.Text>
                        <Card.Text>
                        <b>Quantity:</b> {quantity} 
                        </Card.Text>
                        <Card.Text>
                        <b>Price : </b>  {price} 
                        </Card.Text>
                        <span className='d-flex justify-content-between  flex-column '>
                        {/* <Button variant="outline-warning mb-1" onClick={() => navigate(`/checkout/${_id}`)}>Order Now</Button> */}
                        <Button variant="outline-dark mt-1" onClick={() => navigate(`/Allproduct/${_id}`)}>Details</Button>
                        </span>
                  
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default HomeProductCard;
