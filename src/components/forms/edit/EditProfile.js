import React, { Component } from 'react';
import { Container, FormControl, Button, Card, Form, Modal } from 'react-bootstrap';
import requester from './../../../infrastructure/requester';
import Error from './../../errorMessage/Error';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            address: null,
            email: null,
            link: null,
            description: null,
            profile: [{}],
            error: null,
            showAdd: false,
            showEdit: false
        }
    }
    handleCloseAdd = () => {
        this.setState({ showAdd: false });
    }
    handleShowAdd = () => {
        this.setState({ showAdd: true });
    }
    handleCloseEdit = () => {
        this.setState({ showEdit: false });
    }
    handleShowEdit = () => {
        this.setState({ showEdit: true });
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }
    handleAdd = () => {
        const data = {
            username: this.state.username,
            address: this.state.address,
            email: this.state.email,
            link: this.state.link,
            description: this.state.description
        };
        requester.put(`User/${this.props.userId}`, data);
        this.setState({ profile: data });
    }
    componentDidMount() {
        requester.get(`user/${this.props.userId}`)
            .then(data => {
                this.setState({
                    username: data[0].username,
                    address: data[0].address,
                    email: data[0].email,
                    link: data[0].link,
                    description: data[0].description
                });
            })
    }
    render = () => {
        return (
            <Container >
                <br />
                <Card.Text><i className="fas fa-user " style={{ color: '#279081' }} /><span className="user-name"> {this.state.username} </span></Card.Text>
                <Card.Text><i className="fas fa-map-marker-alt" style={{ color: '#279081', marginRight: '5px' }} /> {this.state.address}</Card.Text>
                <Card.Text><i className="fas fa-envelope-square" style={{ color: '#279081', marginRight: '7px' }} />{this.state.email}</Card.Text>
                <Card.Link href="#"><i className="fas fa-link" /> {this.state.link}</Card.Link>
                <Card.Text><i className="fas fa-info" style={{ color: '#279081', marginRight: '5px' }} /> {this.state.description}</Card.Text>
                <button className="editBtn" type="button" onClick={this.handleShowAdd}><i class="fas fa-pen"></i></button>
                <br />
                <Modal
                    show={this.state.showAdd}
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Username:</Form.Label>
                                <FormControl name="username" defaultValue={this.state.username} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Address:</Form.Label>
                                <FormControl name="address" defaultValue={this.state.address} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Email:</Form.Label>
                                <FormControl name="email" defaultValue={this.state.email} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Link:</Form.Label>
                                <FormControl name="link" defaultValue={this.state.link} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Description:</Form.Label>
                                <FormControl as="textarea" name="description" defaultValue={this.state.description} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Error error={this.state.error} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseAdd}>Close</Button>
                        <Button variant="primary" onClick={this.handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </Container >
        )
    }
}