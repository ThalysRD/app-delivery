import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellerNavBar from '../components/SellerNavBar';
import SellerDetails from '../components/SellerDetails';

export default class SellerOrderDetails extends Component {
  render() {
    const { history, match } = this.props;
    return (
      <section>
        <SellerNavBar history={ history } />
        <SellerDetails
          match={ match }
        />
      </section>
    );
  }
}

SellerOrderDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
