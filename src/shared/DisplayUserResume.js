import React, { Component } from 'react';
import '../Styles/userStyle.css';
import defaultImageSrc from '../images/blank-profile-picture.png';
import { Card, Figure, ProgressBar, Container } from 'react-bootstrap';
import requester from './../infrastructure/requester';
import Moment from 'moment';

export default class DisplayUserResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: null,
            username:null,
            userProfile: [],
            userSkills: [],
            userLanguages: [],
            userExperience: [],
            userEducation: []
        }
    }
    checkEndDate = (endDate, stillWork) => {
        if (stillWork === true) {
            return <Card.Text as="span" className="onGoingSpan">Still work</Card.Text>
        }
        return <Card.Text className="calendar">{Moment(endDate).format('MMM DD YYYY')}</Card.Text>
    }
    componentDidMount() {
        console.log(this.props.userId);
        requester.get(`UserResume/${this.props.userId}`)
            .then(data => {
                if (data.length > 0) {
                    return this.setState({ userProfile: data, username:data[0].username, imageSrc: data[0].imageSrc, });
                }
            })
            .catch(err => {
                this.setState({ error: err })
            });
        requester.get(`UserResume/${this.props.userId}/skills`)
            .then(data => this.setState({ userSkills: data }))
            .catch(err => {
                this.setState({ error: err })
            });
        requester.get(`UserResume/${this.props.userId}/languages`)
            .then(data => this.setState({ userLanguages: data }))
            .catch(err => {
                this.setState({ error: err })
            });
        requester.get(`UserResume/${this.props.userId}/experiences`)
            .then(data => this.setState({ userExperience: data }))
            .catch(err => {
                this.setState({ error: err })
            });
        requester.get(`UserResume/${this.props.userId}/educations`)
            .then(data => this.setState({ userEducation: data }))
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render = () => {
        let info = this.state.userProfile.map((info, index) => {
            return <div key={index}>
                <div className="profile-image-container">
                    <Figure.Image className="profile-image" alt="Image" src={this.state.imageSrc ? this.state.imageSrc : defaultImageSrc} />
                </div>
                <Card.Text><i className="fas fa-user" style={{ color: '#279081' }} /><span className="user-name"> {info.username}</span></Card.Text>
                <Card.Text><i className="fas fa-map-marker-alt" style={{ color: '#279081', marginRight: '5px' }} /> {info.address}</Card.Text>
                <Card.Text><i className="fas fa-envelope-square" style={{ color: '#279081', marginRight: '7px' }} />{info.email}</Card.Text>
                <Card.Link href="#"><i className="fas fa-link" /> {info.link}</Card.Link>
                <Card.Text><i className="fas fa-info" style={{ color: '#279081', marginRight: '5px' }} /> {info.description}</Card.Text>
            </div>
        });
        let skills = this.state.userSkills.map((skill, index) => {
            return <div key={index}>
                <Card.Text>{skill.title}</Card.Text>
                <ProgressBar className="scale" now={skill.level} label={`${skill.level}%`}  ></ProgressBar>
            </div>
        });
        let languages = this.state.userLanguages.map((language, index) => {
            return <div key={index}>
                <Card.Text className="description" placeholder={language.name}>{language.name}</Card.Text>
                <ProgressBar className="scale" now={language.level} label={`${language.level}%`}></ProgressBar>
                <br />
            </div>
        });
        let experiences = this.state.userExperience.map((exp, index) => {
            return <div className="divContainer" key={index} >
                <br />
                <Card.Text className="title" >Experience as: <b>{exp.jobTitle}</b> at : <b>{exp.companyName}</b></Card.Text>
                <Card.Text className="dateTime">
                    <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                    {/* <Card.Text className="calendar">{Moment(exp.startDate).format('MMM DD YYYY')}</Card.Text> */}
                    <b>To</b>
                    {this.checkEndDate(exp.endDate, exp.stillWork)}
                </Card.Text>
                <Card.Text className="companyDescription" >{exp.description}</Card.Text>
                <hr className="dividing-line" />
            </div>
        });
        let educations = this.state.userEducation.map((educ, index) => {
            return <div className="divContainer" key={index}>
                <Card.Text className="title">{educ.university}</Card.Text>
                <Card.Text className="dateTime">
                    <i className="fas fa-calendar-alt fa-fw w3-margin-right" style={{ color: '#279081' }} />
                    <Card.Text className="calendar">{Moment(educ.startDate).format('MMM DD YYYY')}</Card.Text>
                    <b>To</b>
                    {this.checkEndDate(educ.endDate, educ.present)}
                </Card.Text>
                <Card.Text>Educational qualification : <b>{educ.title}</b></Card.Text>
                <Card.Text>{educ.description}</Card.Text>
                <hr className="dividing-line" />
            </div>
        })
        return (
            <div className="home-container" >
                    <h1 className="home-container-welcome2">{this.state.username} RESUME</h1>
                <Card.Body className="float-child1">
                    <Container >
                        <br />
                        {info}
                        <hr className="dividing-line" />
                    </Container>
                    <Container>
                        <br />
                        <Card.Title>
                            <i className="fas fa-cog" style={{ color: '#279081' }} ></i>
                            <span className="form-title">Skills</span></Card.Title>
                        {skills}
                        <hr className="dividing-line" />
                    </Container>
                    <Container >
                        <br />
                        <Card.Title>
                            <i className="fas fa-globe" style={{ color: '#279081' }} ></i>
                            <span className="form-title" >Languages</span>
                        </Card.Title>
                        {languages}
                        <br />
                    </Container>
                </Card.Body>
                <Card.Body className="float-child2" >
                    <Container><i className="fas fa-briefcase fa-3x" style={{ color: '#279081' }}></i>
                        <br />
                        <Card.Title><span className="form-title" >Experiences</span></Card.Title>
                        {experiences}
                    </Container>
                </Card.Body>
                <Card.Body className="float-child3" >
                    <Container><i className="fas fa-graduation-cap fa-3x" style={{ color: '#279081' }}></i>
                        <Card.Title><span className="form-title">Education</span></Card.Title>
                        {educations}
                    </Container>
                </Card.Body>
            </div>
        )
    }
}
