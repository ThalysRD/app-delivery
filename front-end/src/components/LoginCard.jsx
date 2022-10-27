import React, { Component } from 'react';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    console.log('constructor');
  }

  componentDidMount() {
    const { history } = this.props;

    history.push('/login');
  }

  render() {
    return (
      <div>
        LoginCard
      </div>
    );
  }
}
