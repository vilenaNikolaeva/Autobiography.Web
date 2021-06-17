import React, { Component, Fragment } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../../Styles/navbarStyle.css';

export default class Navigation extends Component {
    render = () => {
        const loggedIn = this.props.isLoggedIn;
        let userNavbarLink =
            <Fragment>
                <Link to="/myResume" className="nav-link active " aria-current="page">My cV</Link>
                <Link to="/edit" className="nav-link active" aria-current="page">Edit </Link>
                <Link to="/logout" className="nav-link active" aria-current="page">Logout</Link>
            </Fragment>

        let guestNavBarLink =
            <Fragment>
                <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
            </Fragment>

        return (
            <Nav >
                <NavItem className="nav nav-masthead float-md-center">
                    <Link className="nav-link active" aria-current="page" to="/" >Home</Link>
                    {loggedIn ? (userNavbarLink) : (guestNavBarLink)}
                </NavItem>
            </Nav>
        )
    };
}