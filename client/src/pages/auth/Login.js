import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Copyright from '../../common/Copyright';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        email: '',
        password: ''
      },
      redirectToRegister: false
    };
  }

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: value }
    });
  }

  handleLogin = e => {
    e.preventDefault();

    const { username, email, password } = this.state.form;

    axios
      .post('/api/v1/auth/login', { user: { username, email, password } })
      .then(res => {
        console.log('Loged: ', this.props.history);
        // Set token to local: setUserInfo
        // Set setAuthorizationHeader: /services/auth.service.js
        this.props.history.push('/');
        console.log('Loged success!!', res);
      });
  }

  handleRegister = e => {
    e.preventDefault();

    this.setState({ redirectToRegister: true });
  }

  render() {
    const { redirectToRegister } = this.state;

    if (redirectToRegister) return <Redirect to='/register' />;

    return (
      <AuthLayout>
        <div className="content-page login-page w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 py-8 mb-4">
            <h1 className="mb-10 text-center">Login to website</h1>
            <div className="mb-4">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                className="w-full"
                id="username"
                name="username"
                type="text"
                placeholder="Your Username"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="w-full"
                id="email"
                name="email"
                type="text"
                placeholder="Your email"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="w-full is-error"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
                onChange={this.handleChange}
              />
              <p className="label-message is-error">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="is-primary"
                type="button"
                onClick={this.handleLogin}
              >Sign In</button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
                Forgot Password?
              </a>
            </div>
          </form>
          <Copyright className="text-center text-xs" />
        </div>
      </AuthLayout>
    );
  }
}

export default LoginPage;
