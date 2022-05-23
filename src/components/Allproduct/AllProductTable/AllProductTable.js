import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsFillTrashFill } from "react-icons/bs";
const AllProductTable = ({product,handleClick}) => {
    const navigate = useNavigate();
    const { productname,providername, img, _id, price ,email,quantity} = product;
// console.log(product)


    return (
        <>
                 <tbody>
                    <tr>
                        <td>{_id}</td>
                        <td><Card.Img variant="top" className='img-fluid' src={img} style={{width:'70px',height:'70px'}} /></td>
                        <td>{productname}</td>
                        <td>{providername}</td>
                        <td>{email}</td>
                        <td>{quantity}</td>
                        <td>{price}</td>
                        <td >
                            <Button variant="success mx-2" onClick={() => navigate(`/Allproduct/${_id}`)}>Details</Button>
                            <Button className='btn btn-primary mx-2' onClick={()=>navigate(`/update/${_id}`)}>Edit</Button>
                            <Button className='btn btn-danger mx-2' onClick={()=>handleClick(_id)}><BsFillTrashFill /> </Button></td>
                    </tr>
                </tbody>
                
        </>
    );
};

export default AllProductTable;
