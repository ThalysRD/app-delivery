import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestSeller, requestCheckout, setToken } from '../services/requests';

export default class CheckoutDetails extends Component {
  constructor() {
    super();
    this.state = {
      idSeller: 0,
      address: '',
      number: '',
      sellers: [],
    };
  }

  componentDidMount() {
    this.sellers();
  }

  sellers = async () => {
    const requisitionAllSellers = await requestSeller();
    this.setState({
      sellers: requisitionAllSellers,
      idSeller: requisitionAllSellers[0].id,
    });
  };

  checkout = async () => {
    const { idSeller, address, number } = this.state;
    const { totalPrice, products, history } = this.props;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const { sale } = await requestCheckout(
      { userId,
        sellerId: idSeller,
        totalPrice,
        deliveryAddress:
        address,
        deliveryNumber: number,
        products },
    );
    history.push(`/customer/orders/${sale}`);
    localStorage.set('carShop', JSON.stringify([]));
  };

  address = ({ target }) => {
    this.setState({
      address: target.value,
    });
  };

  number = ({ target }) => {
    this.setState({
      number: target.value,
    });
  };

  idSeller = ({ target }) => {
    this.setState({
      idSeller: target.value,
    });
  };

  render() {
    const { sellers, number, address } = this.state;
    return (
      <section>
        <h1>Detalhes e Endereço para Entrega</h1>
        <label htmlFor="vendedora">
          {' '}
          P. Vendedora Responsável:
          <select
            id="vendedora"
            data-testid="customer_checkout__select-seller"
            onChange={ this.idSeller }
          >
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="endereco">
          {' '}
          Endereço
          <input
            type="text"
            id="endereco"
            data-testid="customer_checkout__input-address"
            onChange={ this.address }
            value={ address }
          />
        </label>
        <label htmlFor="numero">
          {' '}
          Número
          <input
            type="text"
            id="numero"
            data-testid="customer_checkout__input-address-number"
            onChange={ this.number }
            value={ number }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ this.checkout }
        >
          Finalizar Pedido

        </button>
      </section>
    );
  }
}
CheckoutDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

CheckoutDetails.defaultProps = {
  history: PropTypes.push,
};
