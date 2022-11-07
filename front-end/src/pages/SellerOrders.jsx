import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SellerOrderCard from '../components/SellerOrderCard';
import { requestSellerOrders } from '../services/requests';

export default class SellerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerOrders: [],
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user;

    const sellerOrders = await requestSellerOrders({ sellerId: id });

    this.setState({
      sellerOrders,
    });
  }

  render() {
    const { history } = this.props;
    const { sellerOrders } = this.state;

    return (
      <div>
        <NavBar history={ history } />
        {
          sellerOrders.map(
            (order) => (
              <Link to={ `/seller/orders/${order.id}` } key={ order.id }>
                <SellerOrderCard key={ order.id } order={ order } />
              </Link>
            ),
          )
        }
      </div>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
