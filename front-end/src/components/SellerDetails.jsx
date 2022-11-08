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
    const { notPreparing, status, orderProducts, orderDetails, onTheWay } = this.state;
    const testId = 'seller_order_details__element-order-details-label-delivery-status';
    console.log(notPreparing);
    console.log(onTheWay);
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
            { status }
          </span>
          <span>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ this.preparing }
              disabled={ !notPreparing }
            >
              Preparar Pedido
            </button>
          </span>
          <span>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ notPreparing || onTheWay }
              onClick={ this.onTheWay }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
