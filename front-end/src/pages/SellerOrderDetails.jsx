import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellerNavBar from '../components/SellerNavBar';
import SellerDetails from '../components/SellerDetails';

export default class SellerOrderDetails extends Component {
  render() {
    const { history, match } = this.props;
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")', height: '100vh' }
        }
      >
        <SellerNavBar history={ history } />
        <SellerDetails
          match={ match }
        />
      </main>
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
