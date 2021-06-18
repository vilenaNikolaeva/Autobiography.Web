import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import requester from '../../../infrastructure/requester';


export default class DisplayProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            userProfile:[]
        }
    }
    componentDidMount(){
          requester.get(`user/${this.props.userId}`)
          .then(data => {
              this.setState({ userProfile: data })
          })
    }
    render = () => {
        let info = this.state.userProfile.map((info, index) => {
            return <div key={index}>
                <Card.Text><i className="fas fa-user" style={{color:'#279081'}}/><span className="user-name"> {info.username}</span></Card.Text>
                <Card.Text><i className="fas fa-map-marker-alt" style={{color:'#279081', marginRight: '5px'}}/> {info.address}</Card.Text>
                <Card.Text><i className="fas fa-envelope-square" style={{color:'#279081', marginRight: '7px'}}/>{info.email}</Card.Text>
                <Card.Link href="#"><i className="fas fa-link"/> {info.link}</Card.Link>
                <Card.Text><i className="fas fa-info" style={{color:'#279081', marginRight: '5px'}}/> {info.description}</Card.Text>
            </div>
        })
        return (
            <Container >
                <br/>
                {info}
                <hr className="dividing-line" />
            </Container>
        )
    }
}