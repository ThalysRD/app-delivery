import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminManage from './pages/AdminManage';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/" component={ Home } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ AdminManage } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
