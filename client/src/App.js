import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Error404 from './pages/errors/404';

import ReactMarkdownDemo from './plugins/react-markdown/Demo';
import TUIEditorDemo from './plugins/tui/Demo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/about" component={AboutPage} />

        <Route exact path="/react-markdown" component={ReactMarkdownDemo} />
        <Route path="/react-markdown/:id" component={ReactMarkdownDemo} />
        <Route path="/react-markdown/:id/edit" component={ReactMarkdownDemo} />

        <Route exact path="/tui" component={TUIEditorDemo} />
        <Route path="/tui/:id" component={TUIEditorDemo} />
        <Route path="/tui/:id/edit" component={TUIEditorDemo} />

        <Route component={Error404} />
      </Switch>
    );
  }
}

export default App;
