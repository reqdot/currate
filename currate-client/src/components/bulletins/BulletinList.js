import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBulletins } from '../../actions';
import { Card, CardText, CardColumns, Button } from 'reactstrap';
import '../../css/BulletinList.css';

class BulletinList extends Component {
  componentDidMount() {
    this.props.fetchBulletins();
  }

  renderBulletins() {
    return this.props.bulletins.reverse().map(bulletin => {
      return (
        <div className="container" key={bulletin._id}>
          <Card
            header
            className={
              bulletin.title.length % 2 === 0 ? 'bg-info' : 'bg-secondary'
            }
            style={{ textAlign: 'left', color: 'white', opacity: '0.7' }}
          >
            &nbsp;&nbsp;{bulletin.title}
          </Card>
          <Card body outline color="grey">
            <CardText style={{ color: 'primary' }}>
              <p className="blockquote">{bulletin.content}</p>
              <br />
              <p
                style={{
                  textAlign: 'right',
                  color: 'darkgrey',
                  fontSize: 'medium'
                }}
              >
                Date: {new Date(bulletin.date).toLocaleDateString()}
              </p>
            </CardText>
            <a href={`/bulletins/new/${bulletin._id}`}>
              <Button style={{ float: 'right' }}>Modify</Button>
            </a>
          </Card>
          <hr style={{ marginTop: '1px' }} />
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <CardColumns className="container">
          {this.renderBulletins()}
        </CardColumns>
        <div id="topButton">
          <a href="#top">TOP</a>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ bulletins }) {
  return { bulletins };
}

export default connect(mapStateToProps, { fetchBulletins })(BulletinList);
