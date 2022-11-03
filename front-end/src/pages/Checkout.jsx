import React, { Component } from 'react';
import CheckoutDetails from '../components/CheckoutDetails';
import CheckoutProducts from '../components/CheckoutProducts';

export default class Checkout extends Component {
  render() {
    return (
      <section>
        <CheckoutProducts />
        <CheckoutDetails />
      </section>
    );
  }
}
