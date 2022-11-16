/* eslint-disable react/jsx-max-depth */
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
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/POZLjOU.jpg")', backgroundSize: 'cover' }
        }
      >
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-auto">
              <div
                className="container p-3"
                style={
                  { backgroundColor: 'rgba(0,0,0,0.5)' }
                }
              >
                <div className="row">
                  <div className="col">
                    <form className="container">
                      <div
                        className={ `row justify-content-centerm-2
                        text-center text-white fs-3` }
                      >
                        <div className="col">
                          Register
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col">
                          <label htmlFor="input-username">
                            <input
                              id="input-username"
                              type="text"
                              data-testid="common_register__input-name"
                              onChange={ this.usernameChange }
                              value={ name }
                              placeholder="Username"
                              className="form-control"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col">
                          <label htmlFor="input-email">
                            <input
                              id="input-email"
                              type="email"
                              data-testid="common_register__input-email"
                              onChange={ this.emailChange }
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
                              data-testid="common_register__input-password"
                              onChange={ this.passwordChange }
                              value={ password }
                              placeholder="Password"
                              className="form-control"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {
                            (registrationFailure)
                              ? (
                                <p
                                  data-testid="common_register__element-invalid_register"
                                >
                                  O endereço de e-mail já foi cadastrador.
                                </p>
                              )
                              : null
                          }
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col d-grid">
                          <button
                            type="button"
                            data-testid="common_register__button-register"
                            disabled={ this.checkValidateRegister() }
                            onClick={ (event) => this.register(event) }
                            className="btn btn-primary"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
