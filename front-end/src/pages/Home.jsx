import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  componentDidMount() {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    return (
      <section>Home</section>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Home.defaultProps = {
  history: PropTypes.push,
};
