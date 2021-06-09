import React from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { loginAuth } from '../../services/api/auth';
import FormInput from '../../components/form/FormInput';
import Copyright from '../frontend/common/Copyright';
import AuthLayout from '../layouts/AuthLayout';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: null,
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

  handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = this.state.form;

    const res = await loginAuth(email, password);

    if (res && res.status) {
      console.log('Loged: ', this.props.history);
      // Set token to local: setUserInfo
      // Set setAuthorizationHeader: /services/auth.service.js
      this.props.history.push('/');
      console.log('Loged success!!', res);
    } else {
      console.log(res);
      this.setState({ errors: res.errors });
    }
  }

  handleRegister = e => {
    e.preventDefault();

    this.setState({ redirectToRegister: true });
  }

  render() {
    const { redirectToRegister, errors } = this.state;

    if (redirectToRegister) return <Redirect to='/register' />;

    return (
      <AuthLayout>
        <div className="content-page login-page w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 py-8 mb-4">
            <h1 className="mb-10 text-center">Login to website</h1>
            <div className="mb-4">
              <FormInput
                className="w-full"
                label="Email"
                name="email"
                placeholder="Your email"
                onChange={this.handleChange}
                error={ errors && 'email' in errors ? errors.email : null }
              />
            </div>
            <div className="mb-6">
              <FormInput
                className="w-full"
                label="Password"
                name="password"
                type="password"
                placeholder="******************"
                onChange={this.handleChange}
                error={ errors && 'password' in errors ? errors.password : null }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="is-primary"
                type="button"
                onClick={this.handleLogin}
              >Sign In</button>
              <button
                className="is-primary"
                type="button"
                onClick={this.handleRegister}
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

export default LoginPage;
