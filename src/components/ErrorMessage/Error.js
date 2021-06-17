import React from 'react';
import { Component } from 'react';


export default class Error extends Component {
    render() {
        return <div className="error" name="error" type="text"  ><span><b>{this.props.error}</b></span></div>
    }
}