import React, { Component } from 'react';

export default class AdminForm extends Component {
  render() {
    return (
      <section>
        <form>
          <label htmlFor="input-name">
            Nome
            <input
              id="input-name"
              type="text"
              data-testid="admin_manage__input-name"
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              id="input-email"
              type="email"
              data-testid="admin_manage__input-email"
            />
          </label>
          <label htmlFor="input-password">
            Senha
            <input
              id="input-password"
              type="password"
              data-testid="admin_manage__input-password"
            />
          </label>
          <label htmlFor="input-role">
            Tipo
            <select
              id="input-role"
              data-testid="admin_manage__select-role"
            >
              <option value="customer">
                Cliente
              </option>
              <option value="seller">
                Vendedor
              </option>
              <option value="admin">
                Administrador
              </option>
            </select>
          </label>
        </form>
        <button
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </section>
    );
  }
}
