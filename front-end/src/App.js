import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
