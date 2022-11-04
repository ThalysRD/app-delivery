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
      <section>
        { console.log(orders) }
        <NavBar history={ history } />
        {
          orders.map((order) => (
            <OrderCard key={ order.id } order={ order } />
          ))
        }
      </section>
    );
  }
}

CustomerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
