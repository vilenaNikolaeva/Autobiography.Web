import React, { Component } from 'react';
import { Container, Card, FormControl, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import Moment from 'moment';
import requester from './../../../infrastructure/requester';
import Error from './../../ErrorMessage/Error';


export default class EditExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            startDate: null,
            endDate: null,
            stillWork: false,
            description: null,
            companyName: null,
            experiences: [{}],
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
    getExperienceForEdit = (currExperience) => {
        this.setState({
            id: currExperience.id,
            startDate: Moment(currExperience.startDate).format('YYYY-MM-DD'),
            endDate: Moment(currExperience.endDate).format('YYYY-MM-DD'),
            stillWork: currExperience.stillWork,
            description: currExperience.description,
            companyName: currExperience.companyName,
            showEdit: true
        });
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (value === 'true') {
            return this.setState({ [name]: false });
        }
        else if (value === 'false') {
            return this.setState({ [name]: true, endDate: new Date() });
        }

        this.setState({ [name]: value });
    }
    checkEndDate = (endDate, stillWork) => {
        if (stillWork === true) {
            return <button className="currentBtn">Still work</button>
        }
        return <Card.Text className="calendar">{Moment(endDate).format('MMM DD YYYY')}</Card.Text>
    }
    handleAdd = () => {
        const data = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            stillWork: this.state.stillWork,
            description: this.state.description,
            companyName: this.state.companyName,
            userId: this.props.userId
        };
        if (data.description === null ||
            data.companyName === null ||
            data.startDate === null
        ) {
            return this.setState({ error: 'All fields are required' });
        }
        requester.post(`Experience`, data)
            .then(data => {
                if (!data.error) {
                    data = {
                        startDate: Moment(this.state.startDate).format('YYYY-MM-DD'),
                        endDate: Moment(this.state.endDate).format('YYYY-MM-DD'),
                        stillWork: this.state.stillWork,
                        description: this.state.description,
                        companyName: this.state.companyName,
                        userId: this.props.userId
                    };
                    this.state.experiences.push(data);
                    this.setState({ experiences: this.state.experiences, showAdd: false })
                }
                else {
                    return this.setState({ error: data.title });
                }
            })
            .catch(err => this.setState({ error: err }))
    }
    handleEdit = () => {
        const data = {
            startDate: Moment(this.state.startDate).format('YYYY-MM-DD'),
            endDate: Moment(this.state.endDate).format('YYYY-MM-DD'),
            stillWork: this.state.stillWork,
            description: this.state.description,
            companyName: this.state.companyName
        };
        if (data.description === "" ||
            data.companyName === "" ||
            data.startDate === "" ||
            data.endDate === "") {
            return this.setState({ error: 'All fields are required' });
        }
        requester.put(`Experience/${this.state.id}`, data)
            .then(data => {
                const currExperience = this.state.experiences.find(e => e.id === this.state.id);
                currExperience.startDate = Moment(this.statestartDate).format('YYYY-MM-DD');
                currExperience.endDate = Moment(this.state.endDate).format('YYYY-MM-DD');
                currExperience.stillWork = this.state.stillWork;
                currExperience.description = this.state.description;
                currExperience.companyName = this.state.companyName;
                this.setState({ experiences: this.state.experiences, showEdit: false })
            })
            .catch(err => this.setState({ error: err }))
    }
    handleDelete = (experience) => {
        requester.remove(`experience/${experience.id}`)
            .then(data => {
                const experienceForDelete = this.state.experiences.filter(e => e.id !== experience.id);
                this.setState({ experiences: experienceForDelete })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        requester.get(`user/${this.props.userId}/experiences`)
            .then(data => {
                this.setState({ experiences: data })
            });
    }
    render = () => {
        let currExperiences = this.state.experiences.map((exp, index) => {
            return <div className="divContainer" key={index} >
                <Card.Body>
                    <Card.Text className="title" name="companyName">{exp.companyName}</Card.Text>
                    <Card.Text className="dateTime">
                        <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                        <Card.Text className="calendar"> {Moment(exp.startDate).format('MMM DD YYYY')}</Card.Text>
                        <b>To</b>
                        {this.checkEndDate(exp.endDate, exp.stillWork)}
                    </Card.Text>
                    <Card.Text className="companyDescription" name="description" >{exp.description}</Card.Text>
                    <button className="editBtn" onClick={() => this.getExperienceForEdit(exp)}  ><i className="fas fa-edit"></i></button>
                    <button className="editBtn" onClick={() => this.handleDelete(exp)} ><i className="far fa-trash-alt"></i></button>
                </Card.Body>
                <hr className="dividing-line" />
            </div >
        })
        return (
            <Container><i className="fas fa-briefcase fa-3x" style={{ color: '#279081' }}></i>
                <br />
                <Card.Title><span className="form-title" >Experiences</span></Card.Title>
                {currExperiences}
                <Button size="sm" type="button" onClick={this.handleShowAdd}><i className="fas fa-plus"></i></Button>
                {/* ADD MODAL FORM */}
                <Modal
                    show={this.state.showAdd}
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Experience/Company Name:</Form.Label>
                                <FormControl
                                    name="companyName"
                                    placeholder="Write Job Title/Company Name..."
                                    value={this.state.companyName}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <b>From </b>
                                <FormControl
                                    name="startDate"
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    required={true} />
                                <b> To </b>
                                <FormControl
                                    hidden={this.state.skillWork}
                                    name="endDate"
                                    type={"date"}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Form.Check name="stillWork" defaultValue={this.state.stillWork} onClick={(e) => this.handleChange(e)} label="Still work" />
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Description:</Form.Label>
                                <FormControl
                                    as="textarea"
                                    name="description"
                                    placeholder="Describe your experience for the company..."
                                    value={this.state.description}
                                    required={true}
                                    onChange={(e) => this.handleChange(e)} ></FormControl>
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
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Experience/Company Name:</Form.Label>
                                <FormControl
                                    name="companyName"
                                    value={this.state.companyName}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group >
                            <Form.Group className="mb-3">
                                <b>From </b>
                                <FormControl
                                    name="startDate"
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.startDate}
                                    required={true} />
                                <b> To </b>
                                <FormControl
                                    name="endDate"
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.endDate}
                                />
                            </Form.Group >
                            <Form.Check name="stillWork" checked={this.state.stillWork ? "checked" : null} defaultValue={this.state.stillWork} onClick={(e) => this.handleChange(e)} label="Still work" />
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Description:</Form.Label>
                                <FormControl
                                    as="textarea"
                                    name="description"
                                    value={this.state.description}
                                    required={true}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group >
                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}>Close</Button>
                        <Button variant="primary" onClick={this.handleEdit}>Edit</Button>
                    </Modal.Footer>
                </Modal>
            </Container >
        )
    }
}
