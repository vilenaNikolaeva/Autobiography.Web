import React, { Component } from 'react';
import { Container, FormControl, Button, Card, Form, Modal, Figure } from 'react-bootstrap';
import requester from './../../../infrastructure/requester';
import Error from './../../errorMessage/Error';
import defaultImageSrc from '../../../images/blank-profile-picture.png';
import ImageCropper from './ImageCropper'
import { Route, Link, Redirect } from 'react-router-dom';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.imagePreviewCanvasRef = React.createRef();
        this.state = {
            username: null,
            address: null,
            phone: null,
            email: null,
            link: null,
            imageFile: null,
            imageSrc: null,
            description: null,
            isItPublic: false,
            error: null,
            showEdit: false,
            showImage: false
        }
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
    handleEditProfile = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            link: this.state.link,
            imageFile: this.state.imageFile,
            imageSrc: this.state.imageSrc,
            description: this.state.description,
            isItPublic: this.state.isItPublic
        };
        let formData = new FormData();
        formData.append('imageFile', this.state.imageFile);
        formData.append('imageSrc', this.state.imageSrc);
        formData.append('username', this.state.username);
        formData.append('address', this.state.address);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('link', this.state.link);
        formData.append('description', this.state.description);
        formData.append('isItPublic', this.state.isItPublic);

        requester.putFormData(`User/${this.props.userId}`, formData)
            .then(data => {
                this.setState({
                    username: data.username,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    link: data.link,
                    description: data.description,
                    isItPublic: data.isItPublic,
                    imageFile: data.imageFile,
                    imageSrc: data.imageSrc ? data.imageSrc : defaultImageSrc,
                    showEdit: false
                });
            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    componentDidMount() {
        requester.get(`user/${this.props.userId}`)
            .then(data => {
                this.setState({
                    username: data[0].username,
                    address: data[0].address,
                    phone: data[0].phone,
                    email: data[0].email,
                    link: data[0].link,
                    description: data[0].description,
                    isItPublic: data[0].isItPublic,
                    imageSrc: data[0].imageSrc,
                });
                if (this.state.imageSrc == null) {
                    this.setState({ imageSrc: defaultImageSrc });
                }
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    setImageFileState = (file) => {
        if (file == null) {
            this.setState({ imageFile: file, imageSrc: null, showEdit: true })
        }
        else {
            this.setState({ imageFile: file, showEdit: true })
        }
    }
    showUserPhoneNumber = () => {
        if (this.state.phone !== null) {
            return <Card.Text ><i class="fas fa-phone" style={{ color: '#279081', marginRight: '7px' }} />{this.state.phone}</Card.Text>
        }
    }
    displaySharedLink = () => {
        if (this.state.isItPublic === true) {

            return <Container style={{ display: 'flex', marginLeft: '7%', justifyContent: 'space-betweem', marginBottom: '20px',alignItems:'center' }}>
                <Container>
                    <Link  className="shared-link" to={`/sharedResume/${this.props.userId}`} >Shared Link</Link>
                </Container>
                <Container>
                    <Button onClick={() => { navigator.clipboard.writeText(`http://localhost:3002/sharedResume/${this.props.userId}`) }} variant="outline-success">Copy Link</Button>
                </Container>
            </Container>;
        }
    }
    render = () => {
        return (
            <Container >
                <br />

                {this.displaySharedLink()}
                <Container className="profile-image-container">
                    <Figure.Image className="profile-image" width={171} height={180} alt="Image" src={this.state.imageSrc ? this.state.imageSrc : defaultImageSrc} />
                </Container>
                <Card.Text className="user-name"><i className="fas fa-user " style={{ color: '#279081' }} /> {this.state.username} </Card.Text>
                <Card.Text><i className="fas fa-map-marker-alt" style={{ color: '#279081', marginRight: '5px' }} /> {this.state.address}</Card.Text>
                {this.showUserPhoneNumber()}
                <Card.Text ><i className="fas fa-envelope-square" style={{ color: '#279081', marginRight: '7px' }} />{this.state.email}</Card.Text>
                <Card.Link href="#"><i className="fas fa-link" /> {this.state.link}</Card.Link>
                <Card.Text ><i className="fas fa-info" style={{ color: '#279081', marginRight: '5px' }} /> {this.state.description}</Card.Text>
                <button className="editBtn" type="button" onClick={this.handleShowEdit}><i className="fas fa-pen"></i></button>
                <br />
                <Modal
                    size="xl"
                    show={this.state.showEdit}
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header >
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: 'flex' }}>
                            <Form as="form" className="profile_edit_form" autoComplete="off" noValidate onSubmit={this.handleEditProfile}>
                                <Form.Check
                                    name="isItPublic"
                                    className="isItPublic_checkbox"
                                    checked={this.state.isItPublic ? "checked" : null}
                                    defaultValue={this.state.isItPublic}
                                    onClick={() => this.setState({ isItPublic: !this.state.isItPublic })}
                                    label="Share your resume with others." />
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
                                    <Form.Label className="col-form-label">Phone Number:</Form.Label>
                                    <FormControl name="phone" defaultValue={this.state.phone} onChange={(e) => this.handleChange(e)} ></FormControl>
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
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleCloseEdit}>Close</Button>
                                    <Button variant="primary" type="submit" >Edit</Button>
                                </Modal.Footer>
                            </Form>
                            <ImageCropper onSetImageFileState={this.setImageFileState}></ImageCropper>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container >
        )
    }
}