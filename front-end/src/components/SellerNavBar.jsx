/* eslint-disable react/jsx-max-depth */
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
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
          <div className="container-fluid">
            <div className="navbar-brand" href="#">Drinks</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    type="button"
                    data-testid="customer_products__element-navbar-link-orders"
                    onClick={ this.redirectToOrders }
                    className="btn btn-primary"
                  >
                    Pedidos
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    data-testid="customer_products__element-navbar-user-full-name"
                    className="btn btn-primary"
                  >
                    { username }
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    onClick={ this.redirectToLogin }
                    data-testid="customer_products__element-navbar-link-logout"
                    className="btn btn-primary"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

SellerNavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
