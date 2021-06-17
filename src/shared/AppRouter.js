import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/home/Home';
import LoginForm from '../components/user/LoginForm';
import RegisterForm from '../components/user/RegisterForm';
import Logout from './../components/user/Logout';
import EditUser from './../components/forms/edit/EditUser';
import PersonalResume from '../components/common/PersonalResume';

export default class AppRouter extends Component {
  render = () => {
    const loggedIn = this.props.isLoggedIn;
    const userId = sessionStorage.getItem('user-id');

    let userNavbarRoute =
      <Fragment>
        <Route path="/myResume"><PersonalResume isUserLoggedIn={loggedIn}></PersonalResume></Route>
        <Route path="/edit"><EditUser userId={userId} /></Route>
        <Route path="/logout"><Logout onLoginChange={this.props.onLoginChange}></Logout></Route>
      </Fragment>

    let guestNavBarRoute =
      <Fragment>
        <Route path="/login"><LoginForm onLoginChange={this.props.onLoginChange} /></Route>
        <Route path="/register"><RegisterForm /></Route>
      </Fragment>

    return (
      <Switch >
        <Route exact path="/"><Home isUserLoggedIn={loggedIn} /></Route>
        {loggedIn ? (userNavbarRoute) : (guestNavBarRoute)}
      </Switch>
    )
  };
}