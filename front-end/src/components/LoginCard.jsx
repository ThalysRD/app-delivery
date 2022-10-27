import React, { Component } from 'react';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    console.log('constructor');
  }

  render() {
    return (
      <section>
        <div>
          <label htmlFor="input-email">
            Email
            <input
              id="input-email"
              type="email"
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="input-password">
            Password
            <input
              id="input-password"
              type="password"
              data-testid="common_login__input-password"
            />
          </label>
        </div>
      </section>
    );
  }
}
