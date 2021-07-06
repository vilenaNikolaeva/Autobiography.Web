import React, { Component } from 'react';
import { Container, Card, FormControl, Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import requester from '../../../infrastructure/requester';
import Error from './../../errorMessage/Error';

export default class EditEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            startDate: null,
            endDate: null,
            present: false,
            university: null,
            title: null,
            description: null,
            educations: [{}],
            userId: this.props.userId,
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
    getEducationForEdit = (educationForEdit) => {
        this.setState({
            id: educationForEdit.id,
            startDate: Moment(educationForEdit.startDate).format('YYYY-MM-DD'),
            endDate: Moment(educationForEdit.endDate).format('YYYY-MM-DD'),
            present: educationForEdit.present,
            university: educationForEdit.university,
            title: educationForEdit.title,
            description: educationForEdit.description,
            showEdit: true
        });
    }
    getEducationForDelete = (educationForDelete) => {
        this.setState({
            id: educationForDelete.id,
            startDate: Moment(educationForDelete.startDate).format('YYYY-MM-DD'),
            endDate: Moment(educationForDelete.endDate).format('YYYY-MM-DD'),
            present: educationForDelete.present,
            university: educationForDelete.university,
            title: educationForDelete.title,
            description: educationForDelete.description,
            showDelete: true
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
        else if (name === 'endDate') {
            return this.setState({ present: null });
        }

        this.setState({ [name]: value });
    }
    checkEndDate = (endDate, present) => {
        if (present === true) {
            return <Card.Text as="span" className="onGoingSpan">Present</Card.Text>
        }
        return <Card.Text className="calendar">{Moment(endDate).format('MMM DD YYYY')}</Card.Text>
    }
    handleAdd = () => {
        const data = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            present: this.state.present,
            university: this.state.university,
            title: this.state.title,
            description: this.state.description,
            userId: this.state.userId
        };
        if (data.university === null ||
            data.title === null ||
            data.startDate === null ||
            this.state.endDate == null && this.state.present === 'false') {
            return this.setState({ error: 'Fill in all fields' });
        }
        requester.post(`Education`, data)
            .then(data => {
                if (data !== undefined) {
                    data = {
                        startDate: Moment(this.state.startDate).format('YYYY-MM-DD'),
                        endDate: Moment(this.state.endDate).format('YYYY-MM-DD'),
                        present: this.state.present,
                        university: this.state.university,
                        title: this.state.title,
                        description: this.state.description,
                        userId: this.state.userId
                    };
                    this.state.educations.push(data);
                    this.setState({ educations: this.state.educations, showAdd: false })
                }
                else {
                    return this.setState({ error: data.title });
                }
            })
            .catch(err => { console.log(err) })
    }
    handleEdit = () => {
        const data = {
            id: this.state.id,
            startDate: Moment(this.state.startDate).format('YYYY-MM-DD'),
            endDate: Moment(this.state.endDate).format('YYYY-MM-DD'),
            present: this.state.present,
            university: this.state.university,
            title: this.state.title,
            description: this.state.description
        };

        requester.put(`Education/${data.id}`, data)
            .then(data => {
                const currExperience = this.state.educations.find(e => e.id === this.state.id);
                currExperience.startDate = Moment(this.statestartDate).format('YYYY-MM-DD');
                currExperience.endDate = Moment(this.state.endDate).format('YYYY-MM-DD');
                currExperience.present = this.state.present;
                currExperience.university = this.state.university;
                currExperience.title = this.state.title;
                currExperience.description = this.state.description;
                this.setState({ educations: this.state.educations, showEdit: false })
            })
            .catch(err => this.setState({ error: err }))
    }
    handleDelete = (education) => {
        requester.remove(`education/${this.state.id}`)
            .then(data => {
                const educationForDelete = this.state.educations.filter(e => e.id !== this.state.id);
                this.setState({
                    educations: educationForDelete,
                    showDelete: false
                })
            })
            .catch(err => this.setState({ error: err.title }))
    }
    componentDidMount = () => {
        requester.get(`user/${this.props.userId}/educations`)
            .then(data => {
                this.setState({ educations: data })
            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render = () => {
        let currEducations = this.state.educations.map((educ, index) => {
            return <div className="divContainer" key={index}>
                <Card.Body>
                    <Card.Text className="title" name="university"><b>{educ.university}</b></Card.Text>
                    <Card.Text className="dateTime">
                        <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                        {Moment(educ.startDate).format('MMM DD YYYY')}
                        <b> To </b>
                        {this.checkEndDate(educ.endDate, educ.present)}
                    </Card.Text>
                    <Card.Text className="title" > Educational qualification : <b>{educ.title}</b></Card.Text>
                    <Card.Text className="description">{educ.description}</Card.Text>
                    <button className="editBtn" onClick={() => this.getEducationForEdit(educ)}  ><i className="fas fa-edit"></i></button>
                    <button className="editBtn" onClick={() => this.getEducationForDelete(educ)}><i className="far fa-trash-alt"></i></button>
                    <hr className="dividing-line" />
                </Card.Body>
            </div>
        })
        return (
            <Container><i className="fas fa-graduation-cap fa-3x" style={{ color: '#279081' }}></i>
                <Card.Title><span className="form-title">Education</span></Card.Title>
                {currEducations}
                <Button size="sm" type="button" onClick={this.handleShowAdd}><i className="fas fa-plus"></i></Button>
                {/* ADD MODAL FORM */}
                <Modal
                    show={this.state.showAdd}
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">University:</Form.Label>
                                <FormControl
                                    name="university"
                                    placeholder="Write your education school..."
                                    value={this.state.university}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <b>From </b>
                                <FormControl
                                    name="startDate"
                                    placeholder="When it start..."
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    required={true} />
                                <b> To </b>
                                <FormControl
                                    name="endDate"
                                    placeholder="When it end..."
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Form.Group>
                            <Form.Check name="present" defaultValue={this.state.present} onClick={(e) => this.handleChange(e)} label="Present" />
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Degree:</Form.Label>
                                <FormControl name="title"
                                    value={this.state.title}
                                    placeholder="Write your education qualification..."
                                    required={true}
                                    onChange={(e) => this.handleChange(e)} ></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Description:</Form.Label>
                                <FormControl
                                    as="textarea"
                                    name="descritpion"
                                    placeholder="Describe your education experience..."
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
                    onHide={this.handleCloseAdd}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">University:</Form.Label>
                                <FormControl name="university"
                                    defaultValue={this.state.university}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group>
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
                            </Form.Group>
                            <Form.Check name="present" checked={this.state.present ? "checked" : null} defaultValue={this.state.present} onClick={(e) => this.handleChange(e)} label="Present" />
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Degree:</Form.Label>
                                <FormControl name="title"
                                    defaultValue={this.state.title}
                                    required={true}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="col-form-label">Description:</Form.Label>
                                <FormControl
                                    as="textarea"
                                    name="description"
                                    defaultValue={this.state.description}
                                    onChange={(e) => this.handleChange(e)}></FormControl>
                            </Form.Group>
                        </Form>
                        <Error error={this.state.error} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}> Close</Button>
                        <Button variant="primary" onClick={this.handleEdit}>Edit</Button>
                    </Modal.Footer>
                </Modal>
                {/* DELETE MODAL FORM */}
                <Modal
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
                            <Card.Text className="title" name="university"><b>{this.state.university}</b></Card.Text>
                            <Card.Text className="title" > Educational qualification : <b>{this.state.title}</b></Card.Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.handleDelete()}>Yes</Button>
                            <Button onClick={this.handleCloseDelete}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        )
    }
}