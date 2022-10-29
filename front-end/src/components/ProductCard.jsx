import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
    };
  }

  checkQuantity = () => {
    const { quantity } = this.state;

    if (quantity < 0) {
      this.setState({
        quantity: 0,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      quantity: target.value,
    }, () => {
      this.checkQuantity();
      if (target.value === '') {
        this.setState({
          quantity: 0,
        });
      }
    });
  };

  addQuantity = () => {
    this.setState((previousState) => ({
      quantity: previousState.quantity + 1,
    }));
  };

  subtractQuantity = () => {
    this.setState((previousState) => ({
      quantity: previousState.quantity - 1,
    }), () => this.checkQuantity());
  };

  render() {
    const { product, index } = this.props;
    const { quantity } = this.state;

    return (
      <div data-testid={ `customer_products__element-card-price-${index + 1}` }>
        <div>
          { product.price }
        </div>
        <img src={ product.url_image } alt="produto" />
        <div>
          { product.name }
        </div>
        <div>
          <button
            type="button"
            onClick={ this.subtractQuantity }
          >
            -
          </button>
          <input
            type="number"
            value={ quantity }
            name="quantity"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.addQuantity }
          >
            +
          </button>
        </div>
        <br />
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,

  index: PropTypes.number.isRequired,
};
