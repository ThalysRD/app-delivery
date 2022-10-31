import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    const user = JSON.parse(localStorage.getItem('storage'));
    console.log(user);
    this.state = {
      username: user.name,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('storage'));

    if (!user) {
      this.setState({
        username: 'Usuário',
      });
    }
  }

  redirectToLogin = () => {
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
