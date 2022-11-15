/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellerDetailsCard from './SellerDetailsCard';
import { preparingOrder, getOrderDetails, onTheWayOrder } from '../services/requests';

export default class SellerDetails extends Component {
  constructor() {
    super();

    this.state = {
      notPreparing: true,
      status: '',
      orderProducts: [],
      orderDetails: [],
      onTheWay: false,
      delivered: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { orderDetails, orderProducts } = await getOrderDetails(match.params.id);
    if (orderDetails.status === 'Preparando') {
      this.setState({
        notPreparing: false,
        onTheWay: false,
      });
    }
    if (orderDetails.status === 'Em Trânsito') {
      this.setState({
        notPreparing: false,
        onTheWay: true,
      });
    }
    if (orderDetails.status === 'Entregue') {
      this.setState({
        onTheWay: false,
        notPreparing: false,
        delivered: true,
      });
    }
    this.setState({
      status: orderDetails.status,
    });

    this.setState({
      orderProducts,
      orderDetails,
    });
  }

  preparing = async () => {
    try {
      const { match } = this.props;
      await preparingOrder(match.params.id);
      const { orderDetails } = await getOrderDetails(match.params.id);
      this.setState({
        notPreparing: false,
        status: orderDetails.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onTheWay = async () => {
    try {
      const { match } = this.props;
      await onTheWayOrder(match.params.id);
      const { orderDetails } = await getOrderDetails(match.params.id);
      this.setState({
        onTheWay: true,
        status: orderDetails.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      notPreparing,
      status,
      orderProducts,
      orderDetails,
      onTheWay,
      delivered } = this.state;

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
                <div
                  className="col"
                  data-testid="seller_order_details__element-order-details-label-order-id"
                >
                  {`Pedido #${orderDetails.id}`}
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
        <div className="row justify-content-between align-items-center mb-2">
          <div className="col-auto">
            <span
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              <span className="fw-bold">
                Data:
              </span>
              { ` ${new Date(orderDetails.saleDate).toLocaleDateString('pt-br')}`}
            </span>
          </div>
          <div className="col-auto">
            <span
              data-testid={ `seller_order_details__element
              -order-details-label-delivery-status` }
            >
              <span className="fw-bold">
                Status:
              </span>
              { ` ${status}` }
            </span>
          </div>
          <div className="col-auto">
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ this.preparing }
              disabled={ !notPreparing }
              className="btn btn-dark bg-gradient"
            >
              Preparar Pedido
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ notPreparing || onTheWay || delivered }
              onClick={ this.onTheWay }
              className="btn btn-dark bg-gradient"
            >
              Saiu pra Entrega
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
          </tbody>
        </table>
        <button
          type="button"
          data-testid="seller_order_details__element-order-total-price"
          className="btn btn-dark bg-gradient"
        >
          { 'Preço Total ' }
          <span className="badge text-bg-secondary  ">
            {
              ((orderProducts.reduce((acc, orderProduct) => (
                acc + (orderProduct.quantity * +orderProduct.Product.price)
              ), 0)).toFixed(2)).replace(/\./, ',')
            }
          </span>
        </button>
      </div>
    );
  }
}

SellerDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
