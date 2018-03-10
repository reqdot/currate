import React, { Component } from 'react';
import io from 'socket.io-client';
import { Button, Input } from 'reactstrap';
import '../../css/ChatsForm.css';

class ChatsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      key: 0
    };

    if (process.env.NODE_ENV === 'production') {
      this.socket = io(process.env.PORT);
    } else {
      this.socket = io('localhost:5000');
    }

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ key: this.state.key + 1 });

      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        username: this.state.username,
        message: this.state.message,
        key: this.state.key
      });
      this.setState({ message: '' });
    };
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="fixed">
          <div
            style={{
              marginTop: '40px',
              marginLeft: '100px',
              textAlign: 'left',
              color: 'darkgrey'
            }}
          >
            <h4>Discuss with other Currater!</h4>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <div>
              <Input
                type="text"
                placeholder="Please enter your Nickname"
                style={{ width: '100%' }}
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <br />
              <Input
                type="textarea"
                placeholder="Fire your Message :)"
                style={{
                  height: '300px',
                  width: '100%',
                  background: 'linear-gradient(#f9efaf, #f7e98d)'
                }}
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
              />
              <br />
              <Button
                outline
                color="danger"
                style={{ marginLeft: '440px' }}
                onClick={this.sendMessage}
              >
                Fire!
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute breakWord narrow">
          <br />
          <br />
          <br />
          <div>
            <div className="MessageContainer">
              <div className="MessagesList">
                {this.state.messages.map(message => {
                  return (
                    <div id="chatList" key={message.key}>
                      &nbsp;&nbsp;
                      <h6 id="username">{message.username}:</h6>
                      &nbsp;&nbsp;&nbsp;
                      <span id="message"> {message.message}</span>
                    </div>
                  );
                })}
              </div>
              <div
                style={{ float: 'left', clear: 'both' }}
                ref={el => {
                  this.el = el;
                }}
              />
            </div>
          </div>
          <div id="topButton">
            <a href="#top">TOP</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatsForm;
