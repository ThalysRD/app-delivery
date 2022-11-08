import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SellerNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const username = JSON.parse(localStorage.getItem('user'));
    this.setState({
      username: username.name,
    });

    if (!username) {
      this.setState({
        username: 'Vendedor',
      });
    }
  }

  redirectToLogin = () => {
    localStorage.clear();
    const { history } = this.props;

    history.push('/login');
  };

  redirectToOrders = () => {
    const { history } = this.props;

    history.push('/seller/orders');
  };

  render() {
    const { username } = this.state;

    return (
      <header>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ this.redirectToOrders }
        >
          Pedidos
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { username }
        </button>
        <button
          type="button"
          onClick={ this.redirectToLogin }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </header>
    );
  }
}

SellerNavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
