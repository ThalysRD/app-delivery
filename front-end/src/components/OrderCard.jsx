import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomerOrders extends Component {
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
          { order.saleDate }
        </div>
        <div
          data-testid={ `customer_orders__element-card-price-${order.id}` }
        >
          { order.totalPrice }
        </div>
        <br />
      </div>
    );
  }
}

CustomerOrders.propTypes = {
  order: PropTypes.shape({
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.PropTypes.instanceOf(Date).isRequired,
    sellerId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};
