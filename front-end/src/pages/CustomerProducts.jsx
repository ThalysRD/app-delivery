/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
    const separatedCards = 3;
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")' }
        }
      >
        <div>
          <NavBar
            history={ history }
          />
          <div className="container mt-3 mb-3">
            {
              (_.chunk(products, separatedCards)).map((productGroup, index) => (
                <div
                  className="row justify-content-around  mb-4"
                  key={ index }
                >
                  {
                    productGroup.map((product) => (
                      <ProductCard
                        key={ product.id }
                        product={ product }
                        index={ product.id }
                        getTotalPrice={ this.getTotalPrice }
                      />
                    ))
                  }
                </div>
              ))
              // products.map((product) => (
              //   <ProductCard
              //     key={ product.id }
              //     product={ product }
              //     index={ product.id }
              //     getTotalPrice={ this.getTotalPrice }
              //   />
              // ))
            }
            <div className="row justify-content-center">
              <div className="col-auto">
                <button
                  type="button"
                  onClick={ this.redirectToCheckout }
                  disabled={ carDisabled }
                  data-testid="customer_products__button-cart"
                  className="btn btn-secondary"
                >
                  carrinho:
                  <span data-testid="customer_products__checkout-bottom-value">
                    { `   ${totalPrice.toFixed(2).replace(/\./, ',')}` }
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
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
