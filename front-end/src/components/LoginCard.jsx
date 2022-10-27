import React, { Component } from 'react';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      email: '',
      password: '',
    };
  }

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

    console.log(regex.test(String(email).toLowerCase()));
    console.log(password.length >= minPassword);

    return !(regex.test(String(email).toLowerCase()) && password.length >= minPassword);
  };

  render() {
    const { email, password } = this.state;
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
          <div>
            <button
              data-testid="common_login__button-login"
              type="button"
              disabled={ this.checkLogin() }
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
