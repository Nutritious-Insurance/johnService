/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Carousel from './components/Carousel.jsx';

// const pathArray = window.location.pathname.split('/');
// console.log('pathArray: ', pathArray);
const productId = '2091';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      baseIndex: 0,
      styles: [],
    };
    this.nextThree = this.nextThree.bind(this);
    this.previousThree = this.previousThree.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `/morestyles/${productId}`,
      success: (result) => {
        this.setState({
          styles: result,
        });
        console.log('result: ', result);
      },
    });
  }

  nextThree() {
    if (this.state.baseIndex < (this.state.styles.length - 6)) {
      this.setState({ baseIndex: this.state.baseIndex + 3 });
    } else {
      this.setState({ baseIndex: this.state.styles.length - 4 });
    }
  }

  previousThree() {
    if (this.state.baseIndex > 3) {
      this.setState({ baseIndex: this.state.baseIndex - 3 });
    } else {
      this.setState({ baseIndex: 0 });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const styleSlider = {
      transform: `translateX(${this.state.baseIndex * -25}%)`,
      transition: '.75s',
    };
    return <Carousel
      slider={styleSlider}
      baseIndex={this.state.baseIndex}
      styles={this.state.styles}
      nextThree={this.nextThree}
      previousThree={this.previousThree}
      />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
