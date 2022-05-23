import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
        
                    <section class="p-5 bg-dark text-light" id="learn ">
                        <div class="container">
                            <div class="row align-items-center justify-content-between">

                                <div class="col-md mb-5">
                                    <h2>About Me</h2>
                        
                                    <p>
                                    Hi, I'm Farhan Ahmed, from Sylhet Bangladesh. I'm a Front End developer working since 2018. Now my goal is to explore javascript and react. By 2023 I will be a javascript engineer. I will work hard to achieve my goal. Will do code and read the documentation for gathering great knowledge.
                                    </p>
                                    <Link to={'/Blog'} class="btn btn-light mt3">
                                        <i class="bi bi-chevron-right"></i>
                                        My Blog
                                    </Link>
                                </div>

                                <div class="col-md">
                                <img class="img-fluid " src="../../../images/Farhan.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
          
        </>
    );
};

export default About;