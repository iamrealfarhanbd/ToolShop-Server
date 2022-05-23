import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <>
            <Link to={props.Link} ><button className={props.classes} id={props.id}>{props.buttonname}</button></Link>
        </>
    );
};

export default Button;