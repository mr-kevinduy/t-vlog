import React from 'react';
import { Card, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';

class CartItem extends React.Component {
  render() {
    return (
      <div className="customer-item col">
        <a href="/customers/adp">
          <Card className="text-center">
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Choice</Card.Title>
              <Card.Text>
                Eliminates risk by enabling you to start big or small, with legacy or new applications, using any operational model, on any OS, across any infrastructure, whether it be on prem or across multiple clouds with the same Docker experience throughout.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </a>
      </div>
    );
  }
}

export default CartItem;
