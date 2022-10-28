import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestLogin, setToken } from '../services/requests';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLogged: false,
      failedLogin: false,
    };
  }

  login = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      const { token, role } = await requestLogin({ email, password });
      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      this.setState({
        isLogged: true,
      });
    } catch (error) {
      console.error(error);
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
    const { email, password, isLogged, failedLogin } = this.state;
    if (isLogged) {
      const { history } = this.props;
      console.log(this.props);
      history.push('/customer/products');
    }
    return (
      <section>
        <form>
          <div>
            <label htmlFor="input-email">
              Email:
              <input
                id="input-email"
                type="email"
                data-testid="common_login__input-email"
                onChange={ this.checkEmail }
                name="email"
                value={ email }
              />
            </label>
            <br />
            <label htmlFor="input-password">
              Password:
              <input
                id="input-password"
                type="password"
                data-testid="common_login__input-password"
                onChange={ this.checkPassword }
                name="password"
                value={ password }
              />
            </label>
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
          <div>
            <button
              data-testid="common_login__button-login"
              type="button"
              disabled={ this.checkLogin() }
              onClick={ (event) => this.login(event) }
            >
              Login
            </button>
            <button
              data-testid="common_login__button-register"
              type="button"
            >
              Register
            </button>
          </div>
        </form>
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
