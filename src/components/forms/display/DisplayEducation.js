import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import requester from '../../../infrastructure/requester';


export default class DisplayEducation extends Component {
    constructor(props){
        super(props);
        this.state={
            userEducation:[]
        }
    }
    checkEndDate = (endDate, present) => {
        if (present === true) {
            return <button className="currentBtn">Present</button>
        }
        return  <Card.Text className="calendar">{endDate.slice(0, 10)}</Card.Text>
    }
    componentDidMount(){
        requester.get(`user/${this.props.userId}/educations`)
            .then(data => {
                this.setState({ userEducation: data })
            });
    }
    render = () => {
        let educations = this.state.userEducation.map((educ, index) => {
            return <div className="divContainer"key={index}>
                <Card.Text className="title">{educ.university}</Card.Text>
                <Card.Text className="dateTime">
                    <i className="fas fa-calendar-alt fa-fw w3-margin-right" style={{color:'#279081'}}/> 
                    <Card.Text className="calendar">{educ.startDate.slice(0, 10)}</Card.Text>
                    <b>To</b>
                    {this.checkEndDate(educ.endDate, educ.present)}
                    </Card.Text>
                <Card.Text>{educ.title}</Card.Text>
                <Card.Text>{educ.description}</Card.Text>
                <hr className="dividing-line" />
            </div>
        })
        return (
            <Container><i className="fas fa-graduation-cap fa-3x" style={{color:'#279081'}}></i>
                <Card.Title><span className="form-title">Education</span></Card.Title>
                {educations}
            </Container>
        )
    }
}