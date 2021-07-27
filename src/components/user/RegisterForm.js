import React, { Component } from 'react';
import './../../Styles/registerStyle.css'
import requester from './../../infrastructure/requester';
import { Redirect } from 'react-router';
import Error from './../errorMessage/Error';
import { Card, Form, FormControl } from 'react-bootstrap';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatedPassword: '',
      token: '',
      error: ''
    };
  }
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      repeatedPassword: this.state.repeatedPassword,
      token: this.state.token
    };

    if (this.state.password !== this.state.repeatedPassword) {
      return this.setState({ error: 'Password should match!' });
    }

    requester.post('Authentication/register', data)
      .then(data => {
        console.log(data)
        if (!data.hasOwnProperty("status")) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user-id', data.userId);
        }
        else {
          return this.setState({ error: data.title });
        }
      })
      .then(res => { return <Redirect to="/" /> })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="Register">
        <div className="register-container">
          <Card.Title as="h3" className="register-title">Register</Card.Title>
          <Error error={this.state.error}></Error>
          <Form.Group className="register-form-control">
            <FormControl type="text" placeholder="Username..." name="username" id="username" required onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="register-form-control">
            <FormControl type="email" placeholder="Email..." name="email" id="email" required onChange={this.handleChange} />
          </Form.Group>
          <p className="mandatory-combination">***Mandatory password combinations :
            <p>Contain upper and lowercase, have digits, Punctuation characters!</p></p>
          <Form.Group className='register-form-control'>
            <FormControl type="password" placeholder="Password at least 8 symbols..." name="password" id="psw" required autoComplete="on" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="register-form-control">
            <FormControl type="password" placeholder="Repeat Password..." name="repeatedPassword" autoComplete="on" id="psw-repeat" required onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="register-form-control">
            <button type="btn btn-sumbit" value="Register" ><b>Register</b> </button>
          </Form.Group>
        </div>
      </Form>
    )
  }
}
