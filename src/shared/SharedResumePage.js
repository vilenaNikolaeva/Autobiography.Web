import React, { Component } from 'react';
import './../Styles/userStyle.css'
import requester from './../infrastructure/requester';
import DisplayUserResume from './DisplayUserResume';

export default class SharedResumePage extends Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname);
        this.state = {
            id: this.props.match.params.id,
            name:null,
            // userProfile: null,
            // skills: null,
            // languages: null,
            // experinces: null,
            // educations: null,
            userId: window.location.pathname.split('/')[2],
            isItPublic: null,
            error: null
        }
    }
    componentDidMount = () => {
        requester.get(`UserResume/${this.state.userId}`)
            .then(data => {
                console.log(data);
                const { history } = this.props;
                if (data === undefined) {
                    return history.push('/404');
                }
                else if (data.status === 404) {
                    return history.push('/404');
                }
                else if (data.length > 0) {
                    return this.setState({ isItPublic: true});
                }
            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render = () => {
        return (
            <div className="home-container" >
                <DisplayUserResume userId={this.state.userId}></DisplayUserResume>
            </div>
        )
    }
}