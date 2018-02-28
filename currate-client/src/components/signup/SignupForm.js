import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignupForm extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            fontSize: 'xx-large',
            textAlign: 'center',
            marginTop: '30px'
          }}
        >
          Join Currate, Be a Currater!
        </div>
        <Form style={{ paddingTop: '30px' }}>
          <FormGroup>
            <Label>User Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Please enter your name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Please enter your password"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password Check</Label>
            <Input
              type="password"
              name="password"
              placeholder="Please enter your password again"
            />
          </FormGroup>
          <br />
          <div style={{ marginLeft: '120px' }}>
            <Button outline color="success">
              Login with Google
            </Button>
            &nbsp;&nbsp;
            <Button color="primary">Sign up!</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignupForm;
