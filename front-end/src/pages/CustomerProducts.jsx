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
    };
  }

  componentDidMount() {
    this.reciveProducts();
    this.getTotalPrice();
  }

  getTotalPrice = () => {
    const carShop = JSON.parse(localStorage.getItem('carShop'));
    let totalPrice = 0;

    Object.values(carShop).forEach((product) => {
      totalPrice += product[0] * product[1];
    });

    this.setState({
      totalPrice: Number(totalPrice.toFixed(2)),
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
    const { products, totalPrice } = this.state;
    return (
      <div>
        <NavBar
          history={ history }
        />
        <div>{ totalPrice }</div>
        {
          products.map((product, index) => (
            <ProductCard
              key={ index }
              product={ product }
              index={ index }
              getTotalPrice={ this.getTotalPrice }
            />
          ))
        }
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
