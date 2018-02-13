import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>Currate</h1>
          Take the newest version info of Curreny rate!
        </div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;
