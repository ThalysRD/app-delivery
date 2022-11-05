import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SellerOrderCard from '../components/SellerOrderCard';

export default class SellerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerOrders: [],
    };
  }

  render() {
    const { history } = this.props;

    return (
      <div>
        <NavBar history={ history } />
        <SellerOrderCard />
      </div>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
