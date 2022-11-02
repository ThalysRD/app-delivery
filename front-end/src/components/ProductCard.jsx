import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
    };
  }

  componentDidMount() {
    const product = this.getSelectedProducts();

    if (product.length) {
      this.setState({
        quantity: product[0].quantity,
      });
    } else {
      this.setState({
        quantity: 0,
      });
    }
  }

  getSelectedProducts = () => {
    const { index } = this.props;

    const carShop = JSON.parse(localStorage.getItem('carShop'));

    const thisProduct = carShop.filter((product) => product.id === index);

    return thisProduct;
  };

  checkQuantity = () => {
    const { quantity } = this.state;

    if (quantity < 0) {
      this.setState({
        quantity: 0,
      });
    }
  };

  saveCarShop = (quantity = 0) => {
    const { index, product, getTotalPrice } = this.props;
    const carShop = JSON.parse(localStorage.getItem('carShop'));

    const alreadyExist = carShop.some(
      (prod) => prod.id === index,
    );

    if (alreadyExist) {
      const savedProduct = carShop.find((prod) => prod.id === index);

      savedProduct.quantity = quantity;
    } else {
      carShop.push({
        id: index,
        price: product.price,
        quantity,
        name: product.name,
      });
    }

    localStorage.setItem('carShop', JSON.stringify(carShop));
    getTotalPrice();
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
      const { quantity } = this.state;
      this.saveCarShop(quantity);
    });
  };

  addQuantity = () => {
    this.setState((previousState) => ({
      quantity: previousState.quantity + 1,
    }), () => {
      const { quantity } = this.state;
      this.saveCarShop(quantity);
    });
  };

  subtractQuantity = () => {
    this.setState((previousState) => ({
      quantity: previousState.quantity - 1,
    }), () => {
      const { quantity } = this.state;
      this.saveCarShop(quantity);
      this.checkQuantity();
    });
  };

  render() {
    const { product, index } = this.props;
    const { quantity } = this.state;
    return (
      <div>
        <div data-testid={ `customer_products__element-card-title-${index}` }>
          { product.name }
        </div>
        <div data-testid={ `customer_products__element-card-price-${index}` }>
          { JSON.stringify(product.price).replace(/\./, ',') }
        </div>
        <img
          src={ product.url_image }
          alt="produto"
          data-testid={ `customer_products__img-card-bg-image-${index}` }
        />
        <div>
          <button
            type="button"
            onClick={ this.subtractQuantity }
            data-testid={ `customer_products__button-card-rm-item-${index}` }
          >
            -
          </button>
          <input
            type="number"
            value={ quantity }
            name="quantity"
            onChange={ this.handleChange }
            data-testid={ `customer_products__input-card-quantity-${index}` }
          />
          <button
            type="button"
            onClick={ this.addQuantity }
            data-testid={ `customer_products__button-card-add-item-${index}` }
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

  getTotalPrice: PropTypes.func.isRequired,
};
