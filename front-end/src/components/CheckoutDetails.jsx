import React, { Component } from 'react';

export default class CheckoutDetails extends Component {
  render() {
    return (
      <section>
        <h1>Detalhes e Endereço para Entrega</h1>
        <label htmlFor="vendedora">
          {' '}
          P. Vendedora Responsável:
          <select
            name="Fulana"
            id="vendedora"
            data-testid="customer_checkout__select-seller"
          >
            <option value="Fulana">Fulana</option>
          </select>
        </label>
        <label htmlFor="endereco">
          {' '}
          Endereço
          <input
            type="text"
            id="endereco"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="numero">
          {' '}
          Número
          <input
            type="text"
            id="numero"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido

        </button>
      </section>
    );
  }
}
