import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../css/ChatsJoinForm.css';

class ChatsJoinForm extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            fontSize: 'xx-large',
            textAlign: 'center',
            marginTop: '50px'
          }}
        >
          Discuss with other Currater!
        </div>
        <Form>
          <FormGroup>
            <Label>Nick Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Please enter your name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Room Name</Label>
            <Input
              type="text"
              name="roomname"
              placeholder="Please enter your password"
            />
          </FormGroup>
          <br />
          <div id="button-group">
            <Button color="primary">Join a Chat!</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default ChatsJoinForm;
