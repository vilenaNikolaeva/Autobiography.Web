import React, { Component, Fragment } from 'react';
import { Nav, NavItem, NavLink, Container, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../../Styles/navbarStyle.css';
import  Logo  from '../../images/Logo.png';

export default class Navigation extends Component {
    render = () => {
        const loggedIn = this.props.isLoggedIn;
        let userNavbarLink =
            <Fragment>
                <Link to="/myResume" className="nav-link active " aria-current="page"><i class="fas fa-user-alt"></i></Link>
                <Link to="/edit" className="nav-link active" aria-current="page">  <i class="fas fa-pencil-alt"></i></Link>
                <Link to="/logout" className="nav-link active" aria-current="page">Logout</Link>
            </Fragment>

        let guestNavBarLink =
            <Fragment>
                <Link to="/login" className="nav-link active" aria-current="page">Sign in</Link>
                <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
            </Fragment>

        return (
            <Nav className="navbar navbar-expand-lg navbar-light ">
                {/* <NavItem className="collapse navbar-collapse" id="collapsibleNavbar" >
                    <Link className="nav-link active" aria-current="page" to="/" >Home</Link>
                    {loggedIn ? (userNavbarLink) : (guestNavBarLink)}
                </NavItem> */}
               
                <Container className="container-fluid">
                <Figure.Image className="navbar-brand" src={Logo}></Figure.Image>
                    <button
                        className="navbar-toggler "
                        style={{ backgroundColor: 'cadetblue' }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="true"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarTogglerDemo02">
                        <Link className="nav-link active" aria-current="page" to="/" ><i class="fas fa-home"></i></Link>
                        {loggedIn ? (userNavbarLink) : (guestNavBarLink)}
                    </div>
                </Container>
            </Nav>
        )
    };
}