import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Notfound from './pages/Notfound.jsx';

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/profile' component={Profile}/>
              <Route component={Notfound}/>
            </Switch>
        </BrowserRouter>
      </>
    );
  }
}
