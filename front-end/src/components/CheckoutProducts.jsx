import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { funcTotalPrice, funcProducts } = this.props;
    if (carShop.length >= 1) {
      this.setState({
        products: carShop,
      });
      funcProducts(carShop);
    }
    const totalPrice = carShop.reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
    this.setState({
      totalPrice,
    });
    funcTotalPrice(totalPrice.toFixed(2));
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

  render() {
    const { products, totalPrice } = this.state;
    return (
      <div>
        <header
          className="text-center text-bg-dark p-2 bg-gradient"
        >
          FINALIZAR PEDIDO
        </header>
        <table
          className="table table-striped"
        >
          <thead>
            <tr className="table-secondary text-center">
              <th scope="col">Item</th>
              <th scope="col">Descrição</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Valor Unitário</th>
              <th scope="col">Sub-total</th>
              <th scope="col">Remover Item</th>
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
        <button
          type="button"
          data-testid="customer_checkout__element-order-total-price"
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
CheckoutProducts.propTypes = {

  funcTotalPrice: PropTypes.func.isRequired,
  funcProducts: PropTypes.func.isRequired,
};
