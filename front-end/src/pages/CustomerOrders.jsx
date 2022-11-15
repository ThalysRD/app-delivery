/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import { requestOrders } from '../services/requests';

export default class CustomerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  async componentDidMount() {
    const orders = await this.ordersRequest();
    this.setState({
      orders,
    });
  }

  ordersRequest = async () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const orders = await requestOrders({ userId: id });
    return orders;
  };

  render() {
    const { history } = this.props;
    const { orders } = this.state;

    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")', height: '100vh' }
        }
      >
        <NavBar history={ history } />
        <div
          className="container mt-3 mb-3"
        >
          <table
            className="table table-striped"
          >
            <thead>
              <tr className="table-secondary text-center">
                <th scope="col">Item</th>
                <th scope="col">Status</th>
                <th scope="col">Data de Compra</th>
                <th scope="col">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order) => (
                  <OrderCard history={ history } key={ order.id } order={ order } />
                ))
              }
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

CustomerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
