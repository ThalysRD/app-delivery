import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SellerDetailsCard extends Component {
  render() {
    const { orderProduct, position } = this.props;
    const { Product, quantity } = orderProduct;

    return (
      <tr className="table-primary text-center">
        <th
          data-testid={ `seller_order_details__element-order-table-item-number-
          ${position}` }
          scope="row"
        >
          { position + 1 }
        </th>
        <td
          data-testid={ `seller_order_details__element-order-table-name-
          ${position}` }
        >
          { Product.name }
        </td>
        <td
          data-testid={ `seller_order_details__element-order-table-quantity-
          ${position}` }
        >
          { quantity }
        </td>
        <td
          data-testid={ `seller_order_details__element-order-table-unit-price-
          ${position}` }
        >
          { (Product.price).replace(/\./, ',') }
        </td>
        <td
          data-testid={ `seller_order_details__element-order-table-sub-total-
          ${position}` }
        >
          { ((+Product.price * quantity).toFixed(2)).replace(/\./, ',') }
        </td>
      </tr>
    );
  }
}

SellerDetailsCard.propTypes = {
  orderProduct: PropTypes.shape({
    saleId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    Product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      url_image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  position: PropTypes.number.isRequired,
};
