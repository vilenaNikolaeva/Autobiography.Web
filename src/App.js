import './App.css';
import React, { Component } from 'react';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import AppRouter from './shared/AppRouter';
import { Container } from 'react-bootstrap';
import Particles from 'react-particles-js';
import { TOKEN } from './infrastructure/constants';
// import particlesConfig from './components/particles/particles-config';

class App extends Component {
  constructor(props) {
    super(props);

    let hasToken = false;
    if (sessionStorage.getItem(TOKEN)) {
      hasToken = true;
    }
    this.state = {
      loggedIn: hasToken
    }
  }

  handleLoginChange = (isLogged) => {
    this.setState({ loggedIn: isLogged });
  };

  render() {
    return (
      <Container className="App">
        <Container className="Header">
          <Navigation onLoginChange={this.handleLoginChange} isLoggedIn={this.state.loggedIn} />
        </Container>
        <Container className="Container">
          <AppRouter onLoginChange={this.handleLoginChange} isLoggedIn={this.state.loggedIn} />
        </Container>
        <Particles className="particles"></Particles>
        <Container className="Footer">
          <Footer />
        </Container>
      </Container >
    );
  }
}

export default App;
