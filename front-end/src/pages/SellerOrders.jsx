import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';

export default class SellerOrders extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <NavBar history={ history } />
      </div>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
