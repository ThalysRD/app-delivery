import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SellerDetailsCard extends Component {
  render() {
    const { orderProduct, position } = this.props;
    const { Product, quantity } = orderProduct;

    return (
      <div>
        <div>
          <div
            data-testid={ `seller_order_details__element-order-table-item-number-
            ${position}` }
          >
            id:
            { position + 1 }
          </div>
          <div
            data-testid={ `seller_order_details__element-order-table-name-
            ${position}` }
          >
            { Product.name }
          </div>
        </div>
        <div>
          <div
            data-testid={ `seller_order_details__element-order-table-quantity-
            ${position}` }
          >
            { quantity }
          </div>
          <div
            data-testid={ `seller_order_details__element-order-table-unit-price-
            ${position}` }
          >
            { (Product.price).replace(/\./, ',') }
          </div>
          <div
            data-testid={ `seller_order_details__element-order-table-sub-total-
            ${position}` }
          >
            { ((+Product.price * quantity).toFixed(2)).replace(/\./, ',') }
          </div>
        </div>
        <br />
      </div>
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
