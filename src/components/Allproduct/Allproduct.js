import React from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import useAllProducts from '../../hooks/useAllProducts';
import MetaData from '../layout/MetaData';
import Loading from '../Loading/Loading';
import AllProductTable from './AllProductTable/AllProductTable';

const Allproduct = () => {

    const [products,setProducts] = useAllProducts([])
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
                    const remaining = products.filter(product => product._id !== id);
                    setProducts(remaining);
                })
        }
    }

    return (
        <>
           <MetaData title="Ebazar -Inventory" />

            <Container className='mx-auto my-5'>
                <Row >
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
          
                    {products.length ? products.map(product => <AllProductTable key={product._id} product={product} handleClick={handleDelete} />) : <Loading />}
                  
            </Table>
                </Row>
            </Container>
        </>
    );
};

export default Allproduct;