import React from 'react';
import { Link } from 'react-router-dom';
import './../../Styles/footerStyle.css'
import { Card, Container } from 'react-bootstrap';

function Footer() {
    return (
        <Container className="footer-container">
            <Card.Footer className=" text-center">
                <Container className="container">
                    <section className="mb-4">
                        <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/" role="button"
                        ><i className="fab fa-google"></i
                        ></a>
                        <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/" role="button"
                        ><i className="fab fa-linkedin-in"></i
                        ></a>
                        <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/" role="button"
                        ><i className="fab fa-github"></i
                        ></a>
                    </section>
                </Container>

                <Container className="text-center p-3" >
                    © 2021 
                </Container>
            </Card.Footer>
        </Container>
    )

}
export default Footer;