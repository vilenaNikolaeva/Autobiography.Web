import React, { Component } from 'react';
import './../../../Styles/userStyle.css';

import EditProfile from './EditProfile';
import EditSkills from './EditSkills';
import EditLanguages from './EditLanguages';
import EditExperience from './EditExperience';
import EditEducation from './EditEducation';
import { Card } from 'react-bootstrap';

export default class EditUser extends Component {
    render = () => {
        return (
            <div className="home-container" >
                <h1 className="home-container-welcome">JUST EDIT</h1>
                <Card.Body className="float-child1">
                    <EditProfile userId={this.props.userId}></EditProfile>
                    <EditSkills userId={this.props.userId}></EditSkills>
                    <EditLanguages userId={this.props.userId}></EditLanguages>
                </Card.Body>
                <Card.Body className="float-child2" >
                    <EditExperience userId={this.props.userId}></EditExperience>
                </Card.Body>
                <Card.Body className="float-child3" >
                    <EditEducation userId={this.props.userId}></EditEducation>
                </Card.Body>
            </div>
        )
    }
}
