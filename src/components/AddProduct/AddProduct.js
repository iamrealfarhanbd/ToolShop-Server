import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import MetaData from '../layout/MetaData';
const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    let from = useLocation.state?.from?.pathname || "/";

    const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/product`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast('Your Product is Added!!!');
                reset();
                navigate(from, { replace: true });
            })
    };
    return (
        <>
            <MetaData title="Ebazar - ADD Product" />
            <div className='w-50 mx-auto'>
                <h2>Please add a service</h2>
                <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                    <input className='mb-2' placeholder='Product Name' {...register("productname", { required: true, maxLength: 20 })} />
                    <input className='mb-2' placeholder='Provider Name' value={user?.displayName} {...register("providername", { required: true, })} readOnly />
                    <input className='mb-2' placeholder='Email' value={user?.email} type="email"{...register("email", { required: true, })} readOnly />
                    <textarea className='mb-2' placeholder='Description' {...register("description")} />
                    <input className='mb-2' placeholder='Quantity' type="number" {...register("quantity")} />
                    <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                    <input className='mb-2' placeholder='Photo URL' type="text" {...register("img")} />
                    <input type="submit" value="Add Service" />
                </form>
            </div>
        </>
    );
};

export default AddProduct;