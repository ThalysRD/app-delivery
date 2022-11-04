import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setToken, requestRegister } from '../services/requests';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      role: 'customer',
      isRegistered: false,
      registrationFailure: false,
    };
  }

  register = async () => {
    try {
      const { name, email, password, role } = this.state;
      console.log(name, email, password, role);
      const { token } = await requestRegister({ email, password, name, role });
      setToken(token);
      localStorage.setItem('user', JSON.stringify({ name, email, role, token }));
      this.setState({
        isRegistered: true,
      });
    } catch (error) {
      this.setState({
        registrationFailure: true,
      });
    }
  };

  usernameChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  emailChange = ({ target }) => {
    this.setState({
      email: target.value,
    });
  };

  passwordChange = ({ target }) => {
    this.setState({
      password: target.value,
    });
  };

  checkValidateRegister = () => {
    const { name, email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValidate = regex.test(String(email).toLowerCase());
    const minCharactersLength = 12;
    const minPasswordLength = 6;
    return !(name.length >= minCharactersLength
       && emailValidate
      && password.length >= minPasswordLength);
  };

  render() {
    const { name, email, password, isRegistered, registrationFailure } = this.state;
    if (isRegistered) {
      const { history } = this.props;
      history.push('/customer/products');
    }
    return (
      <section>
        <form>
          <label htmlFor="input-username">
            Username:
            <input
              id="input-username"
              type="text"
              data-testid="common_register__input-name"
              onChange={ this.usernameChange }
              value={ name }
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              id="input-email"
              type="email"
              data-testid="common_register__input-email"
              onChange={ this.emailChange }
              value={ email }
            />
          </label>
          <label htmlFor="input-password">
            Password:
            <input
              id="input-password"
              type="password"
              data-testid="common_register__input-password"
              onChange={ this.passwordChange }
              value={ password }
            />
          </label>
          {
            (registrationFailure)
              ? (
                <p data-testid="common_register__element-invalid_register">
                  O endereço de e-mail já foi cadastrador.
                </p>
              )
              : null
          }
          <div>
            <button
              type="button"
              data-testid="common_register__button-register"
              disabled={ this.checkValidateRegister() }
              onClick={ (event) => this.register(event) }
            >
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Register.defaultProps = {
  history: PropTypes.push,
};
