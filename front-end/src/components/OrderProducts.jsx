/* eslint-disable react/jsx-max-depth */
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
      status: '',
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
      status: orderDetails.status,
    });
  }

  deliveredCheck = async () => {
    try {
      const { match } = this.props;
      await orderDelivered(match.params.id);
      const { orderDetails } = await getOrderDetails(match.params.id);
      this.setState({
        status: orderDetails.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { products, totalPrice, details, sellerName, status } = this.state;
    const testId = 'customer_order_details__element-order-';
    return (
      <div className="container text-white mt-3">
        <div className="row justify-content-start">
          <div className="col-auto">
            <img
              src="https://i.imgur.com/ENdgmhG.png"
              alt="check-mark"
              style={
                { width: '100px', height: '100px' }
              }
            />
          </div>
          <div className="col">
            <div className="container fs-4">
              <div className="row fw-bold">
                <div className="col" data-testid={ `${testId}details-label-order-id` }>
                  {`Pedido #${details.id}`}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Detalhes do Pedido
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-testid={ `${testId}details-label-seller-name` }
          className="row justify-content-center fs-5"
        >
          <div className="col-auto">
            {`Pessoa Vendora: ${sellerName}`}
          </div>
        </div>
        <div className="row justify-content-between align-items-center mb-2">
          <div className="col-auto">
            <span
              data-testid={ `${testId}details-label-order-date` }
            >
              <span className="fw-bold">
                Data:
              </span>
              { ` ${new Date(details.saleDate).toLocaleDateString('pt-br')}`}
            </span>
          </div>
          <div className="col-auto">
            <span
              data-testid={ `${testId}details-label-delivery-status` }
            >
              <span className="fw-bold">
                Status:
              </span>
              { ` ${status}` }
            </span>
          </div>
          <div className="col-auto">
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ () => this.deliveredCheck() }
              disabled={ status !== 'Em Trânsito' }
              className="btn btn-dark bg-gradient"
            >
              Marcar como entregue
            </button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="table-secondary text-center">
              <th scope="col">Item</th>
              <th scope="col">Descrição</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Valor Unitário</th>
              <th scope="col">Sub-total</th>
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
        <button
          type="button"
          data-testid="customer_order_details__element-order-total-price"
          className="btn btn-dark bg-gradient"
        >
          { 'Preço Total ' }
          <span className="badge text-bg-secondary  ">
            {`${totalPrice.toFixed(2)}`.replace(/\./, ',')}
          </span>
        </button>
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
