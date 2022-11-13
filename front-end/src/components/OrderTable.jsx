import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrderTable extends Component {
  render() {
    const { quantity, describe, unitValue, index } = this.props;
    return (
      <tr className="table-primary text-center">
        <th
          data-testid={
            `customer_order_details__element-order-table-item-number-${index}`
          }
          scope="row"
        >
          { index + 1 }

        </th>
        <td
          data-testid={ `customer_order_details__element-order-table-name-${index}` }
        >
          {describe}

        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-quantity-${index}`
          }
        >
          {quantity}

        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-unit-price-${index}`
          }
        >
          { unitValue.replace(/\./, ',') }

        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-sub-total-${index}`
          }
        >
          {`${(+unitValue * +quantity).toFixed(2)}`.replace(/\./, ',')}
        </td>
      </tr>
    );
  }
}

OrderTable.propTypes = {
  index: PropTypes.number.isRequired,
  describe: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unitValue: PropTypes.number.isRequired,
};
