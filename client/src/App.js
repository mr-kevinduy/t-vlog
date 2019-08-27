import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Error404 from './pages/errors/404';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:id" component={HomePage} />
        <Route path="/:id/edit" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/about" component={AboutPage} />

        <Route component={Error404} />
      </Switch>
    );
  }
}

export default App;
