import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getOrderDetails, orderDelivered } from '../services/requests';
import OrderTable from './OrderTable';

class OrderProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPrice: 0,
      details: {},
      sellerName: false,
      delivered: false,
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
    if (orderDetails.status === 'Entregue') {
      this.setState({
        delivered: true,
      });
    }
  }

  deliveredCheck = async (id) => {
    try {
      await orderDelivered(id);
      this.setState({
        delivered: true,
        details: 'Entregue',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { products, totalPrice, details, sellerName, delivered } = this.state;
    const testId = 'customer_order_details__element-order-';
    return (
      <div>
        <header>Detalhe do Pedido</header>
        <span
          data-testid={ `${testId}details-label-order-id` }
        >
          {`Pedido ${details.id}`}
        </span>
        <span
          data-testid={ `${testId}details-label-seller-name` }
        >
          {`P. Vend: ${sellerName}`}
        </span>
        <span
          data-testid={ `${testId}details-label-order-date` }
        >
          { new Date(details.saleDate).toLocaleDateString('pt-br')}
        </span>
        <span
          data-testid={ `${testId}details-label-delivery-status1` }
        >
          {delivered ? 'Entregue' : 'Pendente'}
        </span>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => this.deliveredCheck(details.id) }
          disabled
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const OrderProductsWithRouter = withRouter(OrderProducts);
export default OrderProductsWithRouter;
