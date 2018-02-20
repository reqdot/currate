import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class ChatsForm extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:5000'
    };
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('connect', () => {
      console.log('Connected to server');

      socket.emit('createMessage', {
        from: 'andrew@example.com',
        text: 'Hey!!!!'
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconected from server');
    });

    socket.on('newEmail', email => {
      console.log('New email', email);
    });
    return <div />;
  }
}

export default ChatsForm;
