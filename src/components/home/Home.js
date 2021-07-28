import React, { Component } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import Particles from "react-particles-js";
import './../../Styles/homeStyle.css';
import Articles from "./elements/Articles";
import ExampleCv from "./elements/ExampleCv";
import StepByStep from "./elements/StepByStep";
import Tips from "./elements/Tips";

export default class Home extends Component {
    displayGetStartedButton = () => {
        if (!this.props.isUserLoggedIn) {
            return <svg className="button-getStarted" viewBox="45 60 400 320" xmlns="http://www.w3.org/2000/svg">
                <a href="/login">
                    <path fill="#ea9937" d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210" mask="url(#knockout-text)" >
                    </path>
                </a>
                <mask id="knockout-text">
                    <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                    <text x="147" y="227" fill="#000">Get Started</text>
                </mask>
            </svg>
        }
    }
    render = () => {
        return (
            <Card.Body bsPrefix="div" className="body-homeContainer">
                <Card.Text className="home-container">
                    <Card.Title as="h3" className="home-container-welcome">Step forword in your life .</Card.Title>
                    <Card.Title as="h3" className="home-container-welcome2">Create your CV.
                        Create your new feature.</Card.Title>
                </Card.Text>
                {this.displayGetStartedButton()}
                <Articles />
                <Card.Text className="info-container">
                    <Card.Title as="h3" className="info-home-title">Check out those tips before you get start.</Card.Title>
                </Card.Text>
                <Tips />
                <Card.Title as="label" className="message-question">Not sure how to start?! </Card.Title>
                <StepByStep />
                <Container as="div" className="message-container">
                    <Card.Title as="label" className="message-title">Click and Help yourself with the example.</Card.Title>
                    <Button href="/exampleCv" id="exampleCvBtn"></Button>
                </Container>
                <Particles className="particles"></Particles>
            </Card.Body>
        )
    }
}