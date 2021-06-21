import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Particles from "react-particles-js";
import './../../Styles/homeStyle.css';
import ExampleCv from "./elements/ExampleCv";
import Tips from "./elements/Tips";

export default class Home extends Component {
    displayGetStartedButton = () => {
        if (!this.props.isUserLoggedIn) {
            return <Button href="/login" variant="warning" className="button-getStarted" >Get Started</Button>;
        }
    }
    render = () => {
        return (
            <Card.Body className="body-homeContainer">
                <Card.Text className="home-container">
                    <Card.Title as="h3" className="home-container-welcome">Easy-Peasy ..Try with us!</Card.Title>
                </Card.Text>
                    {this.displayGetStartedButton()}
                <Card.Text className="info-container">
                    <Card.Title as="h5" className="info-home-title">Check out those tips before you get start.</Card.Title>
                </Card.Text>
                <Tips />
                <Particles className="page--hero__background"></Particles>
                <ExampleCv/>
            </Card.Body>
        )
    }
}