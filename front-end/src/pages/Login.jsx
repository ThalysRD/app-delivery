import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginCard from '../components/LoginCard';

export default class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/POZLjOU.jpg")', backgroundSize: 'cover' }
        }
      >
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-auto">
              <LoginCard history={ history } />
            </div>
          </div>
        </div>
      </main>
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
