import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutDetails from '../components/CheckoutDetails';
import CheckoutProducts from '../components/CheckoutProducts';
import NavBar from '../components/NavBar';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      products: [],
    };
  }

  funcTotalPrice = (price) => {
    this.setState({
      totalPrice: price,
    });
  };

  funcProducts = (products) => {
    const newProdct = products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));
    this.setState({
      products: newProdct,
    });
  };

  render() {
    const { totalPrice, products } = this.state;
    const { history } = this.props;
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")' }
        }
      >
        <NavBar
          history={ history }
        />
        <div
          className="container mt-3 mb-3"
        >
          <CheckoutProducts
            funcTotalPrice={ this.funcTotalPrice }
            funcProducts={ this.funcProducts }
          />
          <CheckoutDetails
            totalPrice={ +totalPrice }
            products={ products }
            history={ history }
          />
        </div>
      </main>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Checkout.defaultProps = {
  history: PropTypes.push,
};
