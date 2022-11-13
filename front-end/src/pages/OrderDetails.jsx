import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import OrderProducts from '../components/OrderProducts';

export default class OrderDetails extends Component {
  render() {
    const { history } = this.props;
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")', height: '100vh' }
        }
      >
        <NavBar history={ history } />
        <OrderProducts />
      </main>
    );
  }
}

OrderDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

OrderDetails.defaultProps = {
  history: PropTypes.push,
};
