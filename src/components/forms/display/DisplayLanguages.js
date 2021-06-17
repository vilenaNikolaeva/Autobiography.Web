import React, { Component } from 'react';
import { Container, Card,ProgressBar } from 'react-bootstrap';
import requester from '../../../infrastructure/requester';

export default class DisplayLanguages extends Component {
    constructor(props){
        super(props);
        this.state={
            userLanguages:[]
        }
    }
    componentDidMount(){
         requester.get(`user/${this.props.userId}/languages`)
         .then(data => {
             this.setState({ userLanguages: data })
         });
    }
    render = () => {
        let languages = this.state.userLanguages.map((language, index) => {
            return <div key={index}>
                <Card.Text>{language.name}</Card.Text>
                <ProgressBar className="scale" now={language.level} label={`${language.level}%`}></ProgressBar>
            </div>
        })
        return (
            <Container >
                <br />
                <Card.Title><i className="fas fa-globe" style={{color:'#279081'}} ></i>  Languages</Card.Title>
                {languages}
                <hr className="dividing-line" />
            </Container>
        )
    }
}