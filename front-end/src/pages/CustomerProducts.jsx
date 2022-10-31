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
    };
  }

  componentDidMount() {
    this.reciveProducts();
  }

  reciveProducts = async () => {
    const response = await getProducts();
    console.log(response);
    this.setState({
      products: response,
    });
  };

  render() {
    const { history } = this.props;
    const { products } = this.state;
    return (
      <div>
        <NavBar
          history={ history }
        />
        {
          products.map((product, index) => (
            <ProductCard
              key={ index }
              product={ product }
              index={ index }
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
