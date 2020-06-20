/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
} from 'react-router-dom';

import history from './utils/history';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Notfound from './pages/Notfound.jsx';
import Test from './pages/test.jsx';

import NavBar from './components/Navbar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.checkLogin = () => {
      const getSession = JSON.parse(localStorage.getItem('session'));
      if (getSession) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <>
        <BrowserRouter>
        <Router history={history}>
          <NavBar isLogin={this.state.isLogin} check={() => this.checkLogin()}/>
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/' component={Login}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/profile' component={Profile}/>
              <Route exact path='/test' component={Test}/>
              <Route component={Notfound}/>
            </Switch>
        </Router>
        </BrowserRouter>
      </>
    );
  }
}
