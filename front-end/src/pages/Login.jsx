import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginCard from '../components/LoginCard';

export default class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <LoginCard history={ history } />
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Login.defaultProps = {
  history: PropTypes.push,
};
