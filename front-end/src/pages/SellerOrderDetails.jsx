import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SellerDetails from '../components/SellerDetails';

export default class SellerOrderDetails extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <NavBar history={ history } />
        <SellerDetails />
      </section>
    );
  }
}

SellerOrderDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

SellerOrderDetails.defaultProps = {
  history: PropTypes.push,
};
