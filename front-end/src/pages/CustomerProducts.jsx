import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

const productsMock = [
  {
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const userMock = {
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
};

export default class CustomerProducts extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <NavBar
          history={ history }
          user={ userMock }
        />
        {
          productsMock.map((product, index) => (
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
