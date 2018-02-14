import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBulletins } from '../../actions';

class BulletinList extends Component {
  componentDidMount() {
    this.props.fetchBulletins();
  }

  renderBulletins() {
    return this.props.bulletins.reverse().map(bulletin => {
      return (
        <div className="card darken-1" key={bulletin._id}>
          <div className="card-content">
            <span className="card-title">{bulletin.title}</span>
            <p>{bulletin.content}</p>
            <p className="right">
              date: {new Date(bulletin.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBulletins()}</div>;
  }
}

function mapStateToProps({ bulletins }) {
  return { bulletins };
}

export default connect(mapStateToProps, { fetchBulletins })(BulletinList);
