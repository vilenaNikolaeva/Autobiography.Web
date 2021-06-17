import React, { Component } from 'react';
import './../../../Styles/userStyle.css';
import DisplaySkills from './DisplaySkills';
import DisplayProfile from './DisplayProfile';
import DisplayExperience from './DisplayExperience';
import DisplayEducation from './DisplayEducation';
import { Card, Figure } from 'react-bootstrap';
import DisplayLanguages from './DisplayLanguages';

export default class DisplayUser extends Component {
    render = () => {
        return (
            <div className="cv-container" >
                <Card.Body className="float-child1">
                    <Figure.Image width={171} height={180} alt="Image" src="https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png" />
                    <DisplayProfile userId={this.props.userId}></DisplayProfile>
                    <DisplaySkills userId={this.props.userId}></DisplaySkills>
                    <DisplayLanguages userId={this.props.userId}></DisplayLanguages>

                </Card.Body>
                <Card.Body className="float-child2" >
                    <DisplayExperience userId={this.props.userId}></DisplayExperience>

                </Card.Body>
                <Card.Body className="float-child3" >
                    <DisplayEducation userId={this.props.userId}></DisplayEducation>
                </Card.Body>
            </div>
        )
    }
}
