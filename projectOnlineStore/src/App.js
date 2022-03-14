import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DetailedProduct from './pages/DetailedProduct';
import Home from './pages/Home';

class App extends Component {
  constructor() {
    super();
    if (!localStorage.getItem('cartTrybe')) {
      localStorage.setItem('cartTrybe', JSON.stringify([]));
    }
    if (!localStorage.getItem('userAvaliationList')) {
      localStorage.setItem('userAvaliationList', JSON.stringify([]));
    }
  }

  render() {
    return (
        
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route path="/carrinho" component={ Cart } />
        <Route path="/checkout" component={ Checkout } />
        <Route
          path="/detalhe/:id"
          render={ (props) => <DetailedProduct { ...props } /> }
        />
      </BrowserRouter>

    );
  }
}

export default App;
