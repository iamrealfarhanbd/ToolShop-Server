import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
const Registration = () => {
    const [createUserWithEmailAndPassword,user, loading,errorEmailAndPassword] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating, errorUpdateProfile] = useUpdateProfile(auth);
    const [signInWithGoogle, Googleuser, Googleloading, Googleerror] = useSignInWithGoogle(auth);
    const [token]=useToken(Googleuser || user)
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passRef = useRef('');
    let location = useLocation();
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    let errorEvent;

    const handleRegistration = async (event) =>{
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passRef.current.value;
        await createUserWithEmailAndPassword(email, password);
        
        await updateProfile({ displayName:name });
            console.log('Updated profile');
            console.log(user);
          
    }
    if (Googleerror || errorEmailAndPassword) {
        errorEvent = <p className='text-danger'>Error:{Googleerror?.message} {errorEmailAndPassword?.message}</p>
    }
    const navigateRegister =()=>{
        navigate('/Login');
    }
    if(user){
        navigate('/');
        console.log(user);
    }
    if (token) {
        
        navigate(from, { replace: true });
    }
    return (
        <>
             <div className="container">
                <div className="row">
                    <Form className=' m-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name </Form.Label>
                            <Form.Control ref={nameRef} type="text" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passRef} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check className={`ps-2 ${agree ? 'text-primary' : 'text-danger'}`} onClick={()=>setAgree(!agree)} type="checkbox" label="agree with tramss and Condition" />
                        </Form.Group>
                        <Button disabled={!agree} variant="primary" type="submit" onClick={handleRegistration}>
                            Submit
                        </Button>
                    </Form>
                {errorEvent}
                    <p>Already Have Account ? <Link className='text-danger text-decoration-none' to={'/Login'} onClick={navigateRegister} >please Login </Link> </p>
                    <div className='border-right'> OR </div>
                    <div className='social-Login mt-2 mb-5'>
                        <div id="gSignInWrapper" onClick={() => signInWithGoogle()}>
                            <span className="label">Sign up with: </span>
                            <div id="customBtn" className="customGPlusSignIn">
                                <span className="icon"></span>
                                <span className="buttonText"> Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;