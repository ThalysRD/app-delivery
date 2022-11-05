import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminManage from './pages/AdminManage';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import OrderDetails from './pages/OrderDetails';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/admin/manage" component={ AdminManage } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
