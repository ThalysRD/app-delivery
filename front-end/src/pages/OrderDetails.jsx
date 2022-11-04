import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import OrderProducts from '../components/OrderProducts';

export default class Checkout extends Component {
  render() {
    return (
      <section>
        <NavBar />
        <OrderProducts />
      </section>
    );
  }
}
