import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToRegister: false
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
  }

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({ redirectToRegister: true });
  }

  render() {
    const { redirectToRegister } = this.state;

    if (redirectToRegister) return <Redirect to='/register' />;

    return (
      <MainLayout>
        <div className="content-page login-page d-flex justify-content-center">
          <Card style={{ width: '30rem' }}>
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleLogin}>
                  Login
                </Button>
                <span className="mx-2">- OR -</span>
                <Button variant="primary" type="button" onClick={this.handleRegister}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </MainLayout>
    );
  }
}

export default LoginPage;
