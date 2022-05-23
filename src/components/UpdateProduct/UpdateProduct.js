import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { register, handleSubmit ,reset } = useForm();

    const {id} = useParams();
    const navigate = useNavigate();
    let from = useLocation.state?.from?.pathname || "/";
    const [products,setProducts] = useState([])

    useEffect( () =>{
        const url = `https://ebazzar-warehouse.herokuapp.com/product/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setProducts(data) 
            // console.log(data)
        });
    }, []);

    const onSubmit = data => {
        // console.log(data);
        const url = `https://ebazzar-warehouse.herokuapp.com/product/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(result =>{
            // console.log(result);
            toast('Your Product is Update!!!');
            reset();
            navigate(from, { replace: true });
        } )
    };

    return (
        <div className='w-50 mx-auto'>
            <h2>Please add a service</h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' defaultValue={products?.productname} {...register("name", { required: true, maxLength: 20 })} />
                <input className='mb-2' placeholder='Provider Name' value={products?.providername} {...register("providername", { required: true ,})} readOnly  />
                <input className='mb-2' placeholder='Email' value={products?.email }  type="email"{...register("email", { required: true ,})} readOnly />
                <textarea className='mb-2' placeholder='Description' defaultValue={products?.description} {...register("description")} />
                <input className='mb-2' placeholder='Quantity' defaultValue={products?.quantity} type="number" {...register("quantity")} />
                <input className='mb-2' placeholder='Price' type="number" defaultValue={products?.price} {...register("price")} />
                <input className='mb-2' placeholder='Photo URL' type="text"  defaultValue={products?.img} {...register("img")} />
                <input type="submit" value="Add Service" />
            </form>
        </div>
    );
};

export default UpdateProduct;