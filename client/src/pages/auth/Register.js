import React from 'react';
import { Redirect } from 'react-router-dom';
import { registerAuth } from '../../services/api/auth';
import FormInput from '../../components/form/FormInput';
import AuthLayout from '../../layouts/AuthLayout';
import Copyright from '../../common/Copyright';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        email: '',
        password: ''
      },
      errors: null,
      redirectToLogin: false
    };
  }

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: value }
    });
  }

  handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password } = this.state.form;
    const res = await registerAuth(username, email, password);

    if (res && res.status) {
      console.log('Register!!!');
    } else {
      this.setState({ errors: res.errors });
    }
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({ redirectToLogin: true });
  }

  render() {
    const { redirectToLogin, errors } = this.state;

    if (redirectToLogin) return <Redirect to='/login' />;

    return (
      <AuthLayout>
        <div className="content-page register-page w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 py-8 mb-4">
            <h1 className="mb-10 text-center">Register</h1>
            <div className="mb-4">
              <FormInput
                className="w-full"
                label="Username"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                error={ errors && 'username' in errors ? errors.username : null }
              />
            </div>
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
            <div className="mb-6">
              <FormInput
                className="w-full"
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                placeholder="******************"
                onChange={this.handleChange}
                error={ errors && 'repeatPassword' in errors ? errors.repeatPassword : null }
              />
            </div>
            <div className="flex items-center justify-between">
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

export default RegisterPage;
