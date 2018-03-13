import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import currate2 from '../images/currate2.jpg';
import currate4 from '../images/currate4.jpeg';
import currate5 from '../images/currate5.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './footer';
import '../css/Landing.css';

const items = [
  {
    link: '/chats',
    src: currate2,
    altText: 'Discuss hot issues!',
    caption: 'Chating with other Currater'
  },
  {
    link: '/crawler',
    src: currate5,
    altText: 'Crawling the news!',
    caption: 'You can crawl and save the news!'
  },
  {
    link: '/bulletins',
    src: currate4,
    altText: 'Mark your Weblogs!',
    caption: 'Contact other opinions!'
  }
];

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  renderButton() {
    if (!this.props.auth) {
      return (
        <p className="lead">
          <Link to="/signup/signupform">
            <Button color="primary">Join Currate!</Button>
          </Link>
        </p>
      );
    }
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Link to={item.link}>
            <img src={item.src} alt={item.altText} />
            <CarouselCaption
              captionText={item.caption}
              captionHeader={item.altText}
            />
          </Link>
        </CarouselItem>
      );
    });

    return (
      <div
        className="container"
        style={{ marginTop: '15px', minWidth: '1080px' }}
      >
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <div style={{ textAlign: 'center', marginTop: '-5px' }}>
          <Jumbotron>
            <h1 className="display-3">Let us Currate!</h1>
            <p className="lead">
              <p>
                You know, Currate is a Community to talk and discuss everything
                related to world Economy & Business, and so on!
                <br />
                Feel free to analyze, anticipate and RATE all about ECONOMY!
              </p>
            </p>
            <hr className="my-2" />
            <p>
              You can chat with other Currater, and crawl News, and mark your
              Weblogs.
            </p>
            {this.renderButton()}
          </Jumbotron>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
