import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellerNavBar from '../components/SellerNavBar';
import SellerDetails from '../components/SellerDetails';
import { getOrderDetails } from '../services/requests';

export default class SellerOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderProducts: [],
      orderDetails: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { orderDetails, orderProducts } = await getOrderDetails(match.params.id);

    this.setState({
      orderProducts,
      orderDetails,
    });
  }

  render() {
    const { history } = this.props;
    const { orderProducts, orderDetails } = this.state;

    return (
      <section>
        <SellerNavBar history={ history } />
        <SellerDetails
          orderProducts={ orderProducts }
          orderDetails={ orderDetails }
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
