import React, { Component } from 'react';
import './../../Styles/loginStyle.css';
import requester from './../../infrastructure/requester';
import { withRouter } from 'react-router-dom';
import Error from './../ErrorMessage/Error';
import { FormControl, Form, Card } from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      token: null,
      error: null,
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { history } = this.props;
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      token: this.state.token
    };
    console.log(data);

    if (this.state.username === null ||
      this.state.password === null) {
      return this.setState({ error: "***Enter your email address and password to sign in." })
    }

    requester.post('Authentication/login', data)
      .then(data => {
        if (!data.hasOwnProperty("status")) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user-id', data.userId);
          this.props.onLoginChange(true);
          history.push('/');
        } else {
          if (data.status === 401) {
            return this.setState({ error: '***User does not exist or you may wrong the username or password.Please try again or register.' });
          }
          return this.setState({ error: data.title });
        }
      })
      .catch(res => { console.log(res) });
  }

  render = () => {
    return (
      <Form onSubmit={this.handleSubmit} className="Login">
        <Card.Title as="h3"className="signIn-title">Please sign in</Card.Title>
        <Error error={this.state.error}></Error>
        <Form.Group className="login-form-control">
          <FormControl type="text" name="username"  onChange={this.handleChange} placeholder="Username..." />
        </Form.Group>
        <Form.Group className="login-form-control">
          <FormControl type="password" name="password" onChange={this.handleChange} placeholder="Password..." autoComplete="on" />
        </Form.Group>
        <Form.Group className="login-form-control">
          <button type="btn btn-sumbit" onClick={this.handleSubmit} value="Login" ><b>Login</b></button>
        </Form.Group>

      </Form>
    );
  }
}

export default withRouter(LoginForm);