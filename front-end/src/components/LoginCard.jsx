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

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <section>
        <div>
          <label htmlFor="input-email">
            Email:
            <input
              id="input-email"
              type="email"
              data-testid="common_login__input-email"
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
              name="password"
              value={ password }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="common_login__button-login"
            type="button"
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
      </section>
    );
  }
}
