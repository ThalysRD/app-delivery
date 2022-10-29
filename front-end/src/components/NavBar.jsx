import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log('NavBar');
  }

  redirectToLogin = () => {
    const { history } = this.props;

    history.push('/login');
  };

  render() {
    const { user } = this.props;

    return (
      <header>
        <button
          type="button"
        >
          Produtos
        </button>
        <button
          type="button"
        >
          Meus Pedidos
        </button>
        <button
          type="button"
        >
          { user.name }
        </button>
        <button
          type="button"
          onClick={ this.redirectToLogin }
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
  user: PropTypes.string.isRequired,
};
