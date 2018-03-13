import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.withdrawUser(this.props.auth._id);
  }

  render() {
      return (
      <div>
        <Card
          style={{
            width: '80%',
            marginLeft: '110px',
            marginTop: '130px'
          }}
        >
          <CardBody
            style={{
              marginTop: '-30px',
              marginLeft: '-320px',
              marginRight: '50px',
              marginBottom: '20px'
            }}
          >
            <CardTitle
              style={{
                marginLeft: '530px',
                marginTop: '40px',
                color: 'green'
              }}
            >
              Do you really want to withdraw? :(
              <br/ >
              If you click the button, you can withdraw.
              </CardTitle>
                <Button
                  outline
                  color="success"
                  style={{ marginTop: '5px', marginLeft: '680px' }}
                  onClick={this.handleClick}
                >
                  See you next time!
                </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps, actions)(Withdraw);
