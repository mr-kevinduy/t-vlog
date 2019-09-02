import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Copyright from '../../common/Copyright';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false
    };
  }

  handleRegister = (e) => {
    e.preventDefault();

    console.log('Registed!');
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({ redirectToLogin: true });
  }

  render() {
    const { redirectToLogin } = this.state;

    if (redirectToLogin) return <Redirect to='/login' />;

    return (
      <AuthLayout>
        <div className="content-page register-page w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 py-8 mb-4">
            <h1 className="mb-10 text-center">Register</h1>
            <div className="mb-4">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                className="w-full"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="w-full"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="repeatPassword">Repeat Password</label>
              <input
                className="w-full"
                id="repeatPassword"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="is-primary"
                type="button"
                onClick={this.handleRegisrer}
              >Register</button>
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

export default RegisterPage;
