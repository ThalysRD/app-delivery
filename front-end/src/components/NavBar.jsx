import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log('NavBar');

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const username = JSON.parse(localStorage.getItem('user'));
    console.log(username);
    this.setState({
      username: username.name,
    });

    if (!username) {
      this.setState({
        username: 'Usuário',
      });
    }
  }

  redirectToLogin = () => {
    localStorage.removeItem('user');
    const { history } = this.props;

    history.push('/login');
  };

  render() {
    const { username } = this.state;

    return (
      <header>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
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

NavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};