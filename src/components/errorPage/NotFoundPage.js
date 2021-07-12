import React from 'react';
import './../../Styles/notFoundStyle.css'
import { Link } from 'react-router-dom';
import nothingHere from '../../images/nothingHere.jpg'
import { Figure, Container, Form } from 'react-bootstrap';

export default class NotFoundPage extends React.Component {
    render() {
        return <Container as="div" className="notFound_page_container">
            <Container className="notFound_page" >
                <Figure.Image className="notFound_image" alt="Image" src={nothingHere} />
            </Container>
            <Container className="notFound_text">
                <Form.Label>Don't Cry! Just Go</Form.Label>
                <Link className="link" to="/">HOME </Link>
            </Container>
        </Container>;
    }
}