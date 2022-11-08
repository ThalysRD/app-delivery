import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrderCard extends Component {
  render() {
    const { order } = this.props;

    return (
      <div>
        <div
          data-testid={ `customer_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </div>
        <div
          data-testid={ `customer_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </div>
        <div
          data-testid={ `customer_orders__element-order-date-${order.id}` }
        >
          { new Date(order.saleDate).toLocaleDateString('pt-br') }
        </div>
        <div
          data-testid={ `customer_orders__element-card-price-${order.id}` }
        >
          { order.totalPrice.replace(/\./, ',') }
        </div>
        <br />
      </div>
    );
  }
}

OrderCard.propTypes = {
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
