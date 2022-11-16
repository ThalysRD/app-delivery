import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';

export default class AdminManage extends Component {
  render() {
    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/POZLjOU.jpg")', backgroundSize: 'cover' }
        }
      >
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-auto">
              <AdminForm />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
