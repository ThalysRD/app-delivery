import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProducts } from '../services/requests';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

export default class CustomerProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      totalPrice: 0,
      carDisabled: true,
    };
  }

  componentDidMount() {
    this.reciveProducts();
    this.getTotalPrice();
  }

  redirectToCheckout = () => {
    const { history } = this.props;
    history.push('/customer/checkout');
  };

  getTotalPrice = () => {
    const carShop = JSON.parse(localStorage.getItem('carShop'));

    const total = carShop.reduce((acc, cur) => (cur.price * cur.quantity) + acc, 0);
    this.setState({
      totalPrice: total,
    }, () => {
      const { totalPrice } = this.state;

      if (totalPrice) {
        this.setState({
          carDisabled: false,
        });
      } else {
        this.setState({
          carDisabled: true,
        });
      }
    });
  };

  reciveProducts = async () => {
    const response = await getProducts();
    this.setState({
      products: response,
    });
  };

  render() {
    const { history } = this.props;
    const { products, totalPrice, carDisabled } = this.state;
    return (
      <div>
        <NavBar
          history={ history }
        />
        {
          products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
              index={ product.id }
              getTotalPrice={ this.getTotalPrice }
            />
          ))
        }
        <button
          type="button"
          onClick={ this.redirectToCheckout }
          disabled={ carDisabled }
          data-testid="customer_products__button-cart"
        >
          carrinho:
          <div data-testid="customer_products__checkout-bottom-value">
            { totalPrice.toFixed(2).replace(/\./, ',') }
          </div>
        </button>
      </div>
    );
  }
}

CustomerProducts.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

CustomerProducts.defaultProps = {
  history: PropTypes.push,
};
