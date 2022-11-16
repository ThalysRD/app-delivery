/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { requestRegister } from '../services/requests';

export default class AdminForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      role: 'customer',
      registrationFailure: false,
    };
  }

  register = async () => {
    try {
      const { name, email, password, role } = this.state;
      await requestRegister({ email, password, name, role });
    } catch (error) {
      console.log(error);
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

  roleChange = ({ target }) => {
    this.setState({
      role: target.value,
    });
  };

  checkValidateRegister = () => {
    const { name, email, password, role } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValidate = regex.test(String(email).toLowerCase());
    const minCharactersLength = 12;
    const minPasswordLength = 6;
    return !(name.length >= minCharactersLength
             && emailValidate
            && password.length >= minPasswordLength && role);
  };

  render() {
    const { name, email, password, role, registrationFailure } = this.state;
    return (
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
                  Register User
                </div>
              </div>
              <div className="row m-2">
                <div className="col">
                  <label htmlFor="input-name">
                    <input
                      id="input-name"
                      type="text"
                      data-testid="admin_manage__input-name"
                      value={ name }
                      onChange={ this.usernameChange }
                      placeholder="Nome"
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
                      data-testid="admin_manage__input-email"
                      value={ email }
                      onChange={ this.emailChange }
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
                      data-testid="admin_manage__input-password"
                      value={ password }
                      onChange={ this.passwordChange }
                      placeholder="Senha"
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
              <div className="row m-2">
                <div className="col d-grid">
                  <label htmlFor="input-role">
                    <select
                      id="input-role"
                      data-testid="admin_manage__select-role"
                      value={ role }
                      onChange={ this.roleChange }
                      className="form-select"
                    >
                      <option value="customer">
                        Cliente
                      </option>
                      <option value="seller">
                        Vendedor
                      </option>
                      <option value="administrator">
                        Administrador
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="row m-2">
                <div className="col">
                  {
                    (registrationFailure)
                      ? (
                        <p data-testid="admin_manage__element-invalid-register">
                          {
                            `O endereço de e-mail já está cadastrado.
                              Por favor, insira um email diferente.`
                          }
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
                    data-testid="admin_manage__button-register"
                    disabled={ this.checkValidateRegister() }
                    onClick={ (event) => this.register(event) }
                    className="btn btn-primary"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
