import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../services/requests';
import OrderTable from './OrderTable';

class OrderProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPrice: 0,
      details: {},
      sellerName: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { orderDetails, orderProducts } = await getOrderDetails(match.params.id);
    const totalPrice = orderProducts.reduce((acc, cur) => cur
      .Product.price * cur.quantity + acc, 0);
    this.setState({
      totalPrice,
      details: orderDetails,
      products: orderProducts,
      sellerName: orderDetails.User.name,
    });
  }

  render() {
    const { products, totalPrice, details, sellerName } = this.state;
    const testId = 'customer_order_details__element-order-';
    console.log(details);
    return (
      <div>
        <header>Detalhe do Pedido</header>
        <span
          data-testId={ `${testId}details-label-order-id` }
        >
          {`Pedido ${details.id}`}
        </span>
        <span
          data-testId={ `${testId}details-label-seller-name` }
        >
          {`P. Vend: ${sellerName}`}
        </span>
        <span
          data-testId={ `${testId}details-label-order-date` }
        >
          {details.saleDate}
        </span>
        <span
          data-testId={ `${testId}details-label-delivery-status1` }
        >
          {details.status}
        </span>
        <button
          type="button"
          data-testId="customer_order_details__button-delivery-check"
        >
          Marcar como entregue
        </button>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product, index) => (
              <OrderTable
                key={ index }
                index={ index }
                describe={ product.Product.name }
                quantity={ product.quantity }
                unitValue={ product.Product.price }
              />
            ))}
          </tbody>
        </table>
        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          {`${totalPrice.toFixed(2)}`.replace(/\./, ',')}
        </span>
      </div>
    );
  }
}

OrderProducts.propTypes = {
  match: PropTypes.number.isRequired,
};

const OrderProductsWithRouter = withRouter(OrderProducts);
export default OrderProductsWithRouter;
