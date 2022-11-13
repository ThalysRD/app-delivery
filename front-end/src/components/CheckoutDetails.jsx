/* eslint-disable react/jsx-max-depth */
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
    localStorage.setItem('carShop', JSON.stringify([]));
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
      <section className="container bg-primary pb-2 mt-2 text-white">
        <div className="row text-center text-bg-dark p-2 bg-gradient">
          <div className="col">
            DETALHES E ENDEREÇO PARA ENTREGA
          </div>
        </div>
        <div className="row mt-1">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="vendedora">
                {' '}
                Pessoa Vendedora Responsável
              </label>
              <select
                id="vendedora"
                data-testid="customer_checkout__select-seller"
                onChange={ this.idSeller }
                className="form-select"
              >
                {sellers.map((seller) => (
                  <option value={ seller.id } key={ seller.id }>
                    {seller.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <label htmlFor="endereco">
              {' '}
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              data-testid="customer_checkout__input-address"
              onChange={ this.address }
              value={ address }
              className="form-control"
            />
          </div>
          <div className="col-2">
            <label htmlFor="numero">
              {' '}
              Número
            </label>
            <input
              type="text"
              id="numero"
              data-testid="customer_checkout__input-address-number"
              onChange={ this.number }
              value={ number }
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col d-grid gap-2">
            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ this.checkout }
              className="btn btn-dark bg-gradient mt-3"
            >
              Finalizar Pedido

            </button>
          </div>
        </div>
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
