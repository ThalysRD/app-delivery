import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  usernameChange = ({ target }) => {
    this.setState({
      username: target.value,
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
    const { username, email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValidate = regex.test(String(email).toLowerCase());
    const minCharactersLength = 12;
    const minPasswordLength = 6;
    return !(username.length >= minCharactersLength
       && emailValidate
      && password.length >= minPasswordLength);
  };

  render() {
    const { username, email, password } = this.state;
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
              value={ username }
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
          <div>
            <button
              type="button"
              data-testid="common_register__button-register"
              disabled={ this.checkValidateRegister() }
            >
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}
