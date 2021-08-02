import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/home/Home';
import LoginForm from '../components/user/LoginForm';
import RegisterForm from '../components/user/RegisterForm';
import Logout from './../components/user/Logout';
import EditUser from './../components/forms/edit/EditUser';
import PersonalResume from '../components/common/PersonalResume';
import { USER_ID } from '../infrastructure/constants';
import SharedResumePage from './SharedResumePage';
import NotFoundPage from '../components/errorPage/NotFoundPage';
import ExampleCv from './../components/home/elements/ExampleCv';

export default class AppRouter extends Component {
  render = () => {
    const loggedIn = this.props.isLoggedIn;

    let userNavbarRoute =
      <Fragment>
        <Route path="/myResume"><PersonalResume isUserLoggedIn={loggedIn}></PersonalResume></Route>
        <Route path="/edit"><EditUser userId={sessionStorage.getItem(USER_ID)} /></Route>
        {/* <Route path="/sharedResume/:id" render={(props) => <SharedResumePage {...props} />}></Route> */}
        <Route path="/logout"><Logout onLoginChange={this.props.onLoginChange}></Logout></Route>
      </Fragment>

    let guestNavBarRoute =
      <Fragment>
        <Route path="/login"><LoginForm onLoginChange={this.props.onLoginChange} /></Route>
        <Route path="/register"><RegisterForm /></Route>
        {/* <Route path="/exampleCv"><ExampleCv /></Route> */}
      </Fragment>

    return (
      <Switch >
        <Route exact path="/"><Home isUserLoggedIn={loggedIn} /></Route>
        <Route path="/exampleCv"><ExampleCv /></Route>
        <Route path="/sharedResume/:id" render={(props) => <SharedResumePage {...props} />}></Route>
        <Route path="/404"><NotFoundPage /></Route>
        {loggedIn ? (userNavbarRoute) : (guestNavBarRoute)}
      </Switch>
    )
  };
}