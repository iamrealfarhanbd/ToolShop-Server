import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';
import useAllProducts from '../../hooks/useAllProducts';
import AllProductTable from '../Allproduct/AllProductTable/AllProductTable';
import MetaData from '../layout/MetaData';
import Loading from '../Loading/Loading';


const MyProduct = () => {
    const [user] = useAuthState(auth);
    const [myProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/myproduct?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setMyProducts(data);
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        getOrders();

    }, [user])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `http://localhost:5000/product/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = myProducts.filter(product => product._id !== id);
                    setMyProducts(remaining);
                })
        }
    }
    console.log(myProducts)
    return (
        <>
           <MetaData title="Ebazar - My Product" />

            <Container className='mx-auto my-5'>
                <Row >
                    <h2>My Product: {myProducts.length ? myProducts.length : `No Product Added yet..!`}</h2>
                <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Provider Name</th>
                        <th>Email</th>
                        <th>Quantity</th>
                        <th>price</th>
                        <th>Manage Product</th>
                    </tr>
                </thead>
          
                    { myProducts.map(product => <AllProductTable key={product._id} product={product} handleClick={handleDelete} />) }

                    </Table>
                </Row>
            </Container>

        </>
    );
};

export default MyProduct;