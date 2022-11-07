import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SellerDetails from '../components/SellerDetails';

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
        <NavBar history={ history } />
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
  }),

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

SellerOrderDetails.defaultProps = {
  history: PropTypes.push,
};
