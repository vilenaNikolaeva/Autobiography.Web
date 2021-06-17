import React, { Component } from 'react';
import { Container, Card, ProgressBar } from 'react-bootstrap';
import requester from '../../../infrastructure/requester';

export default class DisplaySkills extends Component {
    constructor(props){
        super(props);
        this.state={
            userSkills:[]
        }
    }
    componentDidMount(){
        requester.get(`user/${this.props.userId}/skills`)
        .then(data => {
            this.setState({ userSkills: data })
        });
    }
    render = () => {
        let skills =
            this.state.userSkills.map((skill, index) => {
                return <div  key={index}>
                    <Card.Text>{skill.title}</Card.Text>
                    <ProgressBar className="scale" now={skill.level} label={`${skill.level}%`}  ></ProgressBar>
                </div>
            })

        return (
            <Container>
                <br />
                <Card.Title><i className="fas fa-cog" style={{color:'#279081'}} ></i> Skills</Card.Title>
                {skills}
                <hr className="dividing-line" />
            </Container>
        )
    }
}