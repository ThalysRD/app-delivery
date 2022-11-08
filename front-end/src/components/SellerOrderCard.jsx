import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SellerOrderCard extends Component {
  render() {
    const { order } = this.props;

    return (
      <div>
        <div
          data-testid={ `seller_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </div>
        <div
          data-testid={ `seller_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </div>
        <div
          data-testid={ `seller_orders__element-order-date-${order.id}` }
        >
          { new Date(order.saleDate).toLocaleDateString()}
        </div>
        <div
          data-testid={ `seller_orders__element-card-price-${order.id}` }
        >
          { order.totalPrice }
        </div>
        <div
          data-testid={ `seller_orders__element-card-address-${order.id}` }
        >
          { `${order.deliveryAddress}, ${order.deliveryNumber}` }
        </div>
        <br />
      </div>
    );
  }
}

SellerOrderCard.propTypes = {
  order: PropTypes.shape({
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    sellerId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};
