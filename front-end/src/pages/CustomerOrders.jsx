import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <NavBar history={ history } />
        {
          orders.map((order) => (
            <Link to={ `/customer/orders/${order.id}` } key={ order.id }>
              <OrderCard key={ order.id } order={ order } />
            </Link>
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
