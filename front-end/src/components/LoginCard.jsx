/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestLogin, setToken, loginValidate } from '../services/requests';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLogged: false,
      failedLogin: false,
      role: '',
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      this.validateLogin(data.token);
    }
  }

  validateLogin = async (token) => {
    try {
      setToken(token);
      const { role } = await loginValidate();
      this.setState({
        isLogged: true,
        role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  register = () => {
    const { history } = this.props;
    history.push('/register');
  };

  login = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      const { id, name, token, role } = await requestLogin({ email, password });
      setToken(token);
      localStorage.setItem('user', JSON.stringify({ id, name, email, role, token }));
      localStorage.setItem('carShop', JSON.stringify([]));

      this.setState({
        isLogged: true,
        role,
      });
    } catch (error) {
      this.setState({
        failedLogin: true,
      });
    }
  };

  checkPassword = ({ target }) => {
    this.setState({
      password: target.value,
    });
  };

  checkEmail = ({ target }) => {
    this.setState({
      email: target.value,
    });
  };

  checkLogin = () => {
    const { email, password } = this.state;

    const minPassword = 6;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return !(regex.test(String(email).toLowerCase()) && password.length >= minPassword);
  };

  render() {
    const { email, password, isLogged, failedLogin, role } = this.state;
    if (isLogged) {
      const { history } = this.props;
      if (role === 'customer') history.push('/customer/products');
      if (role === 'seller') history.push('/seller/orders');
      if (role === 'administrator') history.push('/admin/manage');
    }
    return (
      <section
        style={
          { backgroundColor: 'rgba(0,0,0,0.5)' }
        }
        className="container p-3"
      >
        <div className="row">
          <div className="col">
            <form className="container">
              <div className="row justify-content-center m-2 text-center text-white fs-3">
                <div className="col">
                  Login
                </div>
              </div>
              <div className="row m-2">
                <div className="col">
                  <label htmlFor="input-email">
                    <input
                      id="input-email"
                      type="email"
                      data-testid="common_login__input-email"
                      onChange={ this.checkEmail }
                      name="email"
                      value={ email }
                      placeholder="Email"
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
              <div className="row m-2">
                <div className="col">
                  <label htmlFor="input-password">
                    <input
                      id="input-password"
                      type="password"
                      data-testid="common_login__input-password"
                      onChange={ this.checkPassword }
                      name="password"
                      value={ password }
                      placeholder="Password"
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
              {
                (failedLogin)
                  ? (
                    <p data-testid="common_login__element-invalid-email">
                      {
                        `O endereço de e-mail ou a senha inválidos.
                        Por favor, insira os dados novamente.`
                      }
                    </p>
                  )
                  : null
              }
              <div className="row m-2">
                <div className="col d-grid">
                  <div className="btn-group" role="group">
                    <button
                      data-testid="common_login__button-login"
                      type="button"
                      disabled={ this.checkLogin() }
                      onClick={ (event) => this.login(event) }
                      className="btn btn-primary bg-gradient w-50"
                    >
                      Login
                    </button>
                    <button
                      data-testid="common_login__button-register"
                      type="button"
                      onClick={ () => this.register() }
                      className="btn btn-primary bg-gradient w-50"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

LoginCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

LoginCard.defaultProps = {
  history: PropTypes.push,
};
