import React, { Component } from 'react';
import { Container, Card, FormControl, ProgressBar, Button, Modal, Form } from 'react-bootstrap';
import requester from '../../../infrastructure/requester';
import Error from './../../errorMessage/Error';


export default class EditLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null,
            level: null,
            languages: [{}],
            error: null,
            showAdd: false,
            showEdit: false,
            showDelete: false
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
    handleCloseDelete = () => {
        this.setState({ showDelete: false });
    }
    handleShowDelete = () => {
        this.setState({ showDelete: true });
    }
    getlanguageForEdit = (languageForEdit) => {
        this.setState({
            id: languageForEdit.id,
            name: languageForEdit.name,
            level: languageForEdit.level,
            showEdit: true
        })
    }
    getLanguageForDelete = (languageforDelete) => {
        this.setState({
            id: languageforDelete.id,
            name: languageforDelete.name,
            level: languageforDelete.level,
            showDelete: true
        });
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    handleAdd = () => {
        const data = {
            name: this.state.name,
            level: this.state.level,
            userId: this.props.userId
        };
        if (data.name === null || data.level === null) {
            return this.setState({ error: 'All fields are required.' })
        }
        requester.post(`Language`, data)
            .then(data => {
                if (!data.error) {
                    this.state.languages.push(data);
                    this.setState({ languages: this.state.languages, showAdd: false });
                }
                else {
                    return this.setState({ error: data.title })
                }
            })
            .catch(err => this.setState({ error: err }))
    }
    handleEdit = () => {
        const data = {
            name: this.state.name,
            level: this.state.level
        }
        if (data.name == "" || data.level == "") {
            return this.setState({ error: "All fields are required" })
        }
        requester.put(`Language/${this.state.id}`, data)
            .then(data => {
                const currLanguage = this.state.languages.find(l => l.id === this.state.id);
                currLanguage.name = this.state.name;
                currLanguage.level = this.state.level;
                this.setState({ languages: this.state.languages, showEdit: false });
            })
            .catch(err => this.setState({ error: err }))
    }
    handleDelete = () => {
        requester.remove(`Language/${this.state.id}`)
            .then(data => {
                const languageForDelete = this.state.languages.filter(l => l.id !== this.state.id);
                this.setState({
                    languages: languageForDelete,
                    showDelete: false
                });
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    componentDidMount() {
        requester.get(`user/${this.props.userId}/languages`)
            .then(data => {
                this.setState({ languages: data })
            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render = () => {
        let currLanguages = this.state.languages.map((language, index) => {
            return <div key={index}>
                <Card.Text className="description" placeholder={language.name}>{language.name}</Card.Text>
                <ProgressBar className="scale" now={language.level} label={`${language.level}%`}></ProgressBar>
                <button className="editBtn" onClick={() => this.getlanguageForEdit(language)} ><i className="fas fa-edit"></i></button>
                <button className="editBtn" onClick={() => this.getLanguageForDelete(language)}  ><i className="far fa-trash-alt"></i></button>
                <br />
            </div>
        })
        return (
            <Container >
                <br />
                <Card.Title>
                    <i className="fas fa-globe" style={{ color: '#279081' }} ></i>
                    <span className="form-title" >Languages</span>
                     </Card.Title>
                {currLanguages}
                <br />
                <Button size="sm" type="button" onClick={this.handleShowAdd}><i className="fas fa-plus"></i></Button>
                {/* ADD MODAL FROM */}
                <Modal
                    show={this.state.showAdd}
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new language</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Language:</Form.Label>
                                <FormControl name="name" placeholder={'Enter skill'}
                                    onChange={(e) => this.setState({ name: e.target.value })} >
                                </FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">level:</Form.Label>
                                <FormControl name="level" placeholder={'number from 1 to 100'}
                                    onChange={(e) => this.setState({ level: e.target.value })} >
                                </FormControl>
                            </Form.Group>
                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseAdd}>Close</Button>
                        <Button variant="primary" onClick={this.handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
                {/* EDIT MODAL FORM */}
                <Modal
                    show={this.state.showEdit}
                    onHide={this.handleCloseEdit}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit language</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Language:</Form.Label>
                                <FormControl name="name"
                                    defaultValue={this.state.name}
                                    onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">level:</Form.Label>
                                <FormControl name="level"
                                    defaultValue={this.state.level}
                                    onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}>Close</Button>
                        <Button variant="primary" onClick={this.handleEdit}>Edit</Button>
                    </Modal.Footer>
                </Modal>
                {/* DELETE MODAL FORM */}
                <Modal
                    size="lg"
                    show={this.state.showDelete}
                    onHide={this.handleCloseDelete}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Please, confirm the delete action.
                        </Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Card.Text>{this.state.name}</Card.Text>
                            <ProgressBar className="scale" now={this.state.level} label={`${this.state.level}%`}  ></ProgressBar>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.handleDelete()}>Yes</Button>
                            <Button onClick={this.handleCloseDelete}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <hr className="dividing-line" />
            </Container>
        )
    }
}