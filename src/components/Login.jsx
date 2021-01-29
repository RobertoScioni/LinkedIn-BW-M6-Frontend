import React, { Component } from "react";
import { Card, Form, Container, Button } from "react-bootstrap";

export default class Login extends Component {
  render() {
    return (
      <div>
        <Container>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Sign in</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Stay updated on your professional world
              </Card.Subtitle>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Card.Link href="#">Forgot password?</Card.Link>
              <Button variant="primary">Sign in</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
