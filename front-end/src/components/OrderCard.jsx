import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrderCard extends Component {
  onClick = () => {
    const { history, order } = this.props;

    history.push(`/customer/orders/${order.id}`);
  };

  render() {
    const { order } = this.props;

    return (
      <tr
        className="table-primary text-center hoverable"
        onClick={ this.onClick }
      >
        <th
          data-testid={ `customer_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </th>
        <td
          data-testid={ `customer_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </td>
        <td
          data-testid={ `customer_orders__element-order-date-${order.id}` }
        >
          { new Date(order.saleDate).toLocaleDateString('pt-br') }
        </td>
        <td
          data-testid={ `customer_orders__element-card-price-${order.id}` }
        >
          { order.totalPrice.replace(/\./, ',') }
        </td>
      </tr>
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

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
