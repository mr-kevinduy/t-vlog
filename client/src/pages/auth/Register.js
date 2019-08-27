import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

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
      <MainLayout>
        <div className="content-page register-page d-flex justify-content-center">
          <Card style={{ width: '30rem' }}>
            <Card.Header as="h5">Register</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Your email" />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Your password" />
                </Form.Group>

                <Form.Group controlId="repeatPassword">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type="password" placeholder="Repeat your password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleRegisrer}>
                  Register
                </Button>
                <span className="mx-2">- OR -</span>
                <Button variant="primary" type="button" onClick={this.handleLogin}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </MainLayout>
    );
  }
}

export default RegisterPage;
