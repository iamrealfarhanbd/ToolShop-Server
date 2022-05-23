import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MetaData from '../layout/MetaData';

const Blog = () => {
    return (
        <>
            <MetaData title="Ebazar - Blog" />

            <Container className='py-5'>
                <h2 className='text-center p-3 '> My Blog Section</h2>
                <Row>
                    <Col xs={12} md={6} className="mt-5">
                        <Card>
                            <Card.Header as="h5"> Difference between javascript and nodejs?
                            </Card.Header>
                            <Card.Body>
                                <Card.Text> Difference between Nodejs and JavaScript :</Card.Text>
                                <Card.Text>JavaScript :</Card.Text>
                                <ul>
                                    <li>Javascript is a programming language that is used for writing scripts on the website.</li>
                                    <li>Javascript can only be run in the browsers.</li>
                                    <li>It is basically used on the client-side.</li>
                                    <li>Javascript is capable enough to add HTML and play with the DOM. </li>
                                    <li>Javascript can run in any browser engine as like JS core in safari and Spidermonkey in Firefox. </li>
                                    <li>Javascript is used in frontend development.</li>
                                </ul>
                                <Card.Text>NodeJS :</Card.Text>
                                <ul>
                                    <li>NodeJS is a Javascript runtime environment.</li>
                                    <li>We can run Javascript outside the browser with the help of NodeJS.</li>
                                    <li>It is mostly used on the server-side.</li>
                                    <li>Nodejs does not have capability to add HTML tags. </li>
                                    <li>V8 is the Javascript engine inside of node.js that parses and runs Javascript.  </li>
                                    <li>Nodejs is used in server-side development.</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                        <Card>
                            <Card.Header as="h5">Differences between sql and nosql databases.? </Card.Header>
                            <Card.Body>
                                <Card.Text>SQL  -</Card.Text>
                                <ul>
                                    <li>RELATIONAL DATABASE MANAGEMENT SYSTEM (RDBMS)</li>
                                    <li>These databases have fixed or static or predefined schema</li>
                                    <li>These databases are not suited for hierarchical data storage.</li>
                                    <li>These databases are best suited for complex queries</li>
                                    <li>Vertically Scalable</li>
                                    <li>Follows ACID property</li>
                                </ul>
                                <Card.Text> NoSQL - </Card.Text>
                                <ul>
                                    <li>Non-relational or distributed database system.</li>
                                    <li>They have dynamic schema</li>
                                    <li>These databases are best suited for hierarchical data storage.</li>
                                    <li>These databases are not so good for complex queries</li>
                                    <li>Horizontally scalable</li>
                                    <li>Follows CAP(consistency, availability, partition tolerance)</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                        <Card>
                            <Card.Header as="h5">When should you use nodejs and when should you use mongodb?</Card.Header>
                            <Card.Body>
                                <Card.Text>Node Js  -</Card.Text>
                                <ul>
                                    <li>  Because of its single-threaded nature, Node.js is used to build nonblocking, event-driven servers. It's also used for traditional web sites and back-end API services, but it was designed specifically to support real-time, push-based applications.</li>
                                </ul>
                                <Card.Text> MongoDB - </Card.Text>
                                <ul>
                                    <li>You should consider MongoDB if you have unstructured and/or structured data with the potential for rapid growth,</li>
                                </ul>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                        <Card>
                            <Card.Header as="h5">What is the purpose of jwt and how does it work? </Card.Header>
                            <Card.Body>
                                <Card.Text> JWTs are an excellent way to securely transmit information between parties since they can be signed, which means you can be assured the sender is who they say they are.Using JWT is not about hiding data, but about ensuring its authenticity. In addition, the structure of a JWT makes it possible to verify it has not been tampered with.  </Card.Text>
                                <Card.Text> JWT consists of three parts: a header, payload, and signature.</Card.Text>
                                <ul>
                                    <li>Header</li>
                                    <li>Payload</li>
                                    <li>Signature</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Blog;