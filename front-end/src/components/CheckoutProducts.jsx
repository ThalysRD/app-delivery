import React, { Component } from 'react';
/* import { requestCheckout } from '../services/requests'; */
import CheckoutTable from './CheckoutTable';

export default class CheckoutProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    const carShop = JSON.parse(localStorage.getItem('carShop'));
    console.log(carShop);
    if (carShop.length >= 1) {
      this.setState({
        products: carShop,
      });
    }
    const totalPrice = carShop.reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
    this.setState({
      totalPrice,
    });
  }

  remove = (id) => {
    const { products } = this.state;
    const newProducts = products.filter((product) => product.id !== id);
    this.setState({
      products: newProducts,
    });
    localStorage.setItem('carShop', JSON.stringify(newProducts));
    const totalPrice = newProducts
      .reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
    this.setState({
      totalPrice,
    });
  };
  /*
  checkout = async () => {
    const { totalPrice } = this.state;
    const api = await requestCheckout({ id, idSeller, totalPrice, address, number });
  };

  address = ({ target }) => {
    this.setState({
      address: target.value,
    });
 */

  render() {
    const { products, totalPrice } = this.state;
    console.log(products);
    return (
      <div>
        <header>Finalizar Pedido</header>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              <th>Remover Item</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product, index) => (
              <CheckoutTable
                key={ index }
                id={ product.id }
                index={ index }
                describe={ product.name }
                quantity={ product.quantity }
                unitValue={ product.price }
                remove={ this.remove }
              />
            ))}
          </tbody>
        </table>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {`${totalPrice.toFixed(2)}`.replace(/\./, ',')}
        </span>
      </div>
    );
  }
}
