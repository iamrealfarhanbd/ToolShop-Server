import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAllProducts from '../../hooks/useAllProducts';
import useProductDetails from '../../hooks/useProductDetails';
import Loading from '../Loading/Loading';

const ProductDeatils = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    // const [product] = useProductDetails(productId);
    const [product, setProduct] = useState({});
    const [updatedQuantity, setUpdatedQuantity] = useState(product.quantity);







    // console.log(product.quantity)


    const handlePlaceOrder = event => {
        event.preventDefault();
        const qyt = parseInt(event.target.quantity.value);
        // console.log(qyt)
        const { quantity, ...rest } = product;
        const previousQuantity = parseInt(quantity);
        const updatedProduct = { updatedQuantity: previousQuantity + qyt, ...rest };
        setUpdatedQuantity(updatedProduct);

        Swal.fire({
            title: 'Are you sure?',
            text: `You want to Receive ${product.productname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Receive it!'
        }).then((result) => {

            if (result.isConfirmed) {
                const url = `http://localhost:5000/updateProduct/${productId}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                })
                    .then(res => res.json())
                    .then(result => {
                        // console.log(result);
                        // toast('Your Product is Update!!!');
                        setProduct(updatedProduct);
                    })
                Swal.fire(
                    'Received!',
                    `Your ${product.productname} has been Received.`,
                    'success'
                )
            }
        })

    }


    const handleDecreaseQuantity = () => {

        const { quantity, ...rest } = product;
        const previousQuantity = quantity;
        const updatedProduct = { updatedQuantity: previousQuantity - 1, ...rest };
        setUpdatedQuantity(updatedProduct);
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to Deliver ${product.productname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deliver it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/updateProduct/${productId}`, {
                    method: 'PUT',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(updatedProduct)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('this ',data)
                        // setUpdatedQuantity(data)
                        setProduct(updatedProduct);

                    })
                Swal.fire(
                    'Delivered!',
                    `Your ${product.productname} has been Delivered.`,
                    'success'
                )
            }
        })



    }
    useEffect(() => {
        const url = `http://localhost:5000/product/${productId}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));

    }, [product]);

    return (
        <section className="p-5 bg-dark text-light" id="learn ">
            <Container >
                <Row>
                    <Col lg={6} md={6}>

                        <Card.Img variant="top" className='mx-auto img-fluid' src={product.img} style={{ width: '100%', height: 400 }} />

                    </Col>
                    <Col lg={6} md={6}>
                        <h2>Product : {product.productname}</h2>
                        <h2> Description : {product.description}</h2>
                        <h2>Price : {product.price}</h2>
                        <p>Provider name : {product.providername}</p>
                        <h2>Quantity: {product.quantity}</h2>
                        <form className=' d-flex  align-items-center' onSubmit={handlePlaceOrder}>
                            <input className='m-2 p-2' type="number" name="quantity" placeholder='quantity' required/>
                            <input className='btn btn-primary p-2 ' type="submit" value="increase" />
                        </form>
                        <div className=' '>
                            <Button size="lg" className='btn btn-danger m-2 ' onClick={handleDecreaseQuantity}>Delivered</Button>
                            <Button size="lg" className='m-2 ' variant="warning" onClick={() => navigate("/Allproduct")}> Manage Inventories</Button>
                            <Button size="lg" className='btn btn-primary m-2 ' onClick={() => navigate(`/update/${product._id}`)}>Edit</Button>
                        </div>
                    </Col>


                </Row>
            </Container>
        </section>
    );
};

export default ProductDeatils;