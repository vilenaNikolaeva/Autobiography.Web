import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Moment from 'moment';
import requester from '../../../infrastructure/requester';

export default class DisplayExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userExperience: []
        }
    }
    checkEndDate = (endDate, stillWork) => {
        if (stillWork === true) {
            return <Card.Text as="span" className="onGoingSpan">Still work</Card.Text>
        }
        return <Card.Text className="calendar">{Moment(endDate).format('MMM DD YYYY')}</Card.Text>
    }
    componentDidMount() {
        requester.get(`user/${this.props.userId}/experiences`)
            .then(data => {
                this.setState({ userExperience: data })
            });
    }
    render = () => {
        let experiences = this.state.userExperience.map((exp, index) => {
            return <div className="divContainer" key={index} >
                <br/>
                <Card.Text className="title" >Experience as: <b>{exp.jobTitle}</b> at : <b>{exp.companyName}</b></Card.Text>
                <Card.Text className="dateTime">
                    <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                    <Card.Text className="calendar">{Moment(exp.startDate).format('MMM DD YYYY')}</Card.Text>
                    <b>To</b>
                    {this.checkEndDate(exp.endDate, exp.stillWork)}
                </Card.Text>
                <Card.Text className="companyDescription" >{exp.description}</Card.Text>
                <hr className="dividing-line" />
            </div>
        })
        return (
            <Container><i className="fas fa-briefcase fa-3x" style={{ color: '#279081' }}></i>
                <br />
                <Card.Title><span className="form-title" >Experiences</span></Card.Title>
                {experiences}
            </Container>
        )
    }
}
