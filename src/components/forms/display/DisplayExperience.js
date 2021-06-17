import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Moment } from 'moment';
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
            return <button className="currentBtn">Still work</button>
        }
        return  <Card.Text className="calendar">{endDate.slice(0, 10)}</Card.Text>
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
                <Card.Text className="title" name="companyName">{exp.companyName}</Card.Text>
                <Card.Text className="dateTime">
                    <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                    <Card.Text className="calendar">{exp.startDate.slice(0, 10)}</Card.Text>
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
