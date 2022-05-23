import React, { useRef } from 'react';
import { Form ,Button} from 'react-bootstrap';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../firebase.init';
const RestPass = () => {
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const emailRef = useRef('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        toast('Sent email');
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <Form className=' m-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit }>
                            Submit
                        </Button>
                    </Form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default RestPass;