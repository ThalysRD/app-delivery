/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SellerNavBar from '../components/SellerNavBar';
import SellerOrderCard from '../components/SellerOrderCard';
import { requestSellerOrders } from '../services/requests';

export default class SellerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerOrders: [],
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user;

    const sellerOrders = await requestSellerOrders({ sellerId: id });

    this.setState({
      sellerOrders,
    });
  }

  render() {
    const { history } = this.props;
    const { sellerOrders } = this.state;

    return (
      <main
        style={
          { backgroundImage: 'url("https://i.imgur.com/FuLTjVH.jpg")', height: '100vh' }
        }
      >
        <SellerNavBar history={ history } />
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
                <th scope="col">Endereço</th>
              </tr>
            </thead>
            <tbody>
              {
                sellerOrders.map(
                  (order) => (
                    <SellerOrderCard
                      history={ history }
                      key={ order.id }
                      order={ order }
                    />
                  ),
                )
              }
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
