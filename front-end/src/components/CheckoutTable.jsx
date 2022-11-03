import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckoutTable extends Component {
  render() {
    const { id, quantity, describe, unitValue, index, remove } = this.props;
    return (
      <div>
        <div>
          <tr>
            <td
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {describe}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              {quantity}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
            >
              { unitValue.replace(/\./, ',') }

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              {`${(+unitValue * +quantity).toFixed(2)}`.replace(/\./, ',')}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              <button
                type="submit"
                onClick={ () => remove(id) }
              >
                Remover
              </button>
            </td>
          </tr>
        </div>
        <br />
      </div>
    );
  }
}

CheckoutTable.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  describe: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unitValue: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};
