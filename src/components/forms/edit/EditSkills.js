import React, { Component } from 'react';
import { Container, Card, FormControl, ProgressBar, Button, Modal, Form } from 'react-bootstrap';
import requester from './../../../infrastructure/requester';
import Error from './../../errorMessage/Error';

export default class EditSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: null,
            level: null,
            skills: [{}],
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
    getSkillForEdit = (currentSkill) => {
        this.setState({
            id: currentSkill.id,
            title: currentSkill.title,
            level: currentSkill.level,
            showEdit: true
        });
    }
    getSkillForDelete = (skillForDelete) => {
        this.setState({
            id: skillForDelete.id,
            title: skillForDelete.title,
            level: skillForDelete.level,
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
            id: this.state.id,
            title: this.state.title,
            level: this.state.level,
            userId: this.props.userId
        }
        if (data.title == null || data.level == null) {
            return this.setState({ error: "All fields are required!" })
        }

        requester.post(`skill`, data)
            .then(data => {
                if (!data.errors) {
                    this.state.skills.push(data);
                    this.setState({ skills: this.state.skills, showAdd: false })
                }
                else {
                    this.setState({ error: data.title });
                }

            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    handleEdit = () => {
        const data = {
            title: this.state.title,
            level: this.state.level
        }
        if (data.title === "" || data.level === null) {
            return this.setState({ error: 'All fields are required.' })
        }
        requester.put(`Skill/${this.state.id}`, data)
            .then(data => {
                const currSkill = this.state.skills.find(s => s.id === this.state.id);
                currSkill.title = this.state.title;
                currSkill.level = this.state.level;
                this.setState({ skills: this.state.skills, showEdit: false })
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    handleDelete = () => {
        requester.remove(`Skill/${this.state.id}`)
            .then(data => {
                const skillsAfterDelete = this.state.skills.filter(s => s.id !== this.state.id);
                this.setState({
                    skills: skillsAfterDelete,
                    showDelete: false
                })
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    componentDidMount() {
        // GET SKILLS
        requester.get(`user/${this.props.userId}/skills`)
            .then(data => {
                this.setState({ skills: data })
            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render = () => {
        let currentSkills =
            this.state.skills.map((skill, index) => {
                return <div key={index}>
                    <Card.Text className="description" placeholder={skill.title} >{skill.title}</Card.Text>
                    <ProgressBar className="scale" now={skill.level} label={`${skill.level}%`}  ></ProgressBar>
                    <button className="editBtn" onClick={() => this.getSkillForEdit(skill)} ><i className="fas fa-pen"></i></button>
                    <button className="editBtn" onClick={() => this.getSkillForDelete(skill)} ><i className="far fa-trash-alt"></i></button>
                    <br />
                </div>
            })
        return (
            <Container>
                <hr />
                <br />
                <Card.Title><i className="fas fa-cog" style={{ color: '#279081' }} ></i> Skills</Card.Title>
                {currentSkills}
                <br />
                <Button size="sm" type="button" onClick={this.handleShowAdd} ><i className="fas fa-plus"></i></Button>
                {/* ADD MODAL FROM */}
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
                                <Form.Label className="col-form-label">Skill:</Form.Label>
                                <FormControl name="title" placeholder={'Enter skill'} onChange={(e) => this.setState({ title: e.target.value })} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">level:</Form.Label>
                                <FormControl name="level" placeholder={'number from 1 to 100'} onChange={(e) => this.setState({ level: e.target.value })} ></FormControl>
                            </Form.Group>

                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
                {/* EDIT MODAL FORM */}
                <Modal
                    show={this.state.showEdit}
                    onHide={this.handleCloseEdit}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Skill:</Form.Label>
                                <FormControl name="title" defaultValue={this.state.title} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">level:</Form.Label>
                                <FormControl name="level" defaultValue={this.state.level} onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleEdit}>Edit</Button>
                    </Modal.Footer>
                </Modal>
                {/* DELETE MODAL CONFIRMATION */}
                <Modal
                bsPrefix="modal"
                    size="sm"
                    show={this.state.showDelete}
                    onHide={this.handleCloseDelete}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Please, confirm the delete action.
                        </Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Card.Text>{this.state.title}</Card.Text>
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
