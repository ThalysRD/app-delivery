import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellerDetailsCard from './SellerDetailsCard';

export default class SellerDetails extends Component {
  render() {
    const { orderProducts, orderDetails } = this.props;
    const testId = 'seller_order_details__element-order-details-label-delivery-status';

    return (
      <section>
        Detalhe do Pedido
        <div>
          <span
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            { ` Pedido: ${orderDetails.id} ---- ` }
          </span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            { `${new Date(orderDetails.saleDate).toLocaleDateString('pt-br')} ---- ` }
          </span>
          <span
            data-testid={ testId }
          >
            { orderDetails.status }
          </span>
          <span>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
            >
              Preparar Pedido
            </button>
          </span>
          <span>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled="true"
            >
              Saiu pra Entrega
            </button>
          </span>
        </div>
        <br />
        {
          orderProducts.map(
            (orderProduct, index) => (
              <SellerDetailsCard
                key={ index }
                position={ index }
                orderProduct={ orderProduct }
              />
            ),
          )
        }
        <br />
        <br />
        <div data-testid="seller_order_details__element-order-total-price">
          Total:
          {
            ((orderProducts.reduce((acc, orderProduct) => (
              acc + (orderProduct.quantity * +orderProduct.Product.price)
            ), 0)).toFixed(2)).replace(/\./, ',')
          }
        </div>
      </section>
    );
  }
}

SellerDetails.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    sellerId: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    saleDate: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  orderProducts: PropTypes.arrayOf(PropTypes.shape({
    saleId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    Product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      url_image: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
