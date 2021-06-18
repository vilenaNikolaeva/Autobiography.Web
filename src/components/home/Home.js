import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import './../../Styles/homeStyle.css';
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
                    <Card.Title as="h3" className="home-container-welcome">EASY-PEASY ...BUILD YOUR RESUME</Card.Title>
                </Card.Text>
                    {this.displayGetStartedButton()}
                <Card.Text className="info-container">
                    <Card.Title as="h5" className="info-home-title">Check out those tips before you get start.</Card.Title>
                </Card.Text>
                <Tips />
            </Card.Body>
        )
    }
}