import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand } from "reactstrap";
import CartProductListing from '../components/CartProductListing';
import magasin from "../images/Magasin.png";

class Cart extends Component {
  constructor() {
    super();
    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      cartList: cart,
    };
  }

  componentDidUpdate() {
    const { cartList } = this.state;
    localStorage.setItem('cartTrybe', JSON.stringify(cartList));
  }

  quantityChange = (product, counterChange) => {
    const { cartList } = this.state;
    const index = cartList.reduce((acc, curr, currIndex) => {
      if (curr.product.id === product.id) { return currIndex; }
      return acc;
    }, '');
    switch (counterChange) {
    case 'increase':
      cartList[index].quantity += 1;
      break;
    case 'decrease':
      cartList[index].quantity -= 1;
      if (cartList[index].quantity < 1) { cartList.splice(index, 1); }
      break;
    case 'remove':
      cartList.splice(index, 1);
      break;
    default:
    }
    this.setState({
      cartList,
    });
  }

  render() {
    const { cartList } = this.state;
    const empty = cartList.length === 0;
    return (
      <main>
        <Navbar className="navbar" color="white" expand="md" light>
          <NavbarBrand className="brand" href="/">
            <img src={magasin} alt="magasin-logo" width="200" />
          </NavbarBrand>
        </Navbar>
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h2 class="display-4">Carrinho </h2>
        {empty
          ? (
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h3>
          )
          : (
            <>
              <CartProductListing
                cartList={ cartList }
                quantityChange={ this.quantityChange }
              />
              <Link to="/checkout">
                <button
                  class="btn btn-info buttonfinalizar"
                  type="button"
                >
                  Finalizar compra
                </button>
              </Link>
            </>
              ) }
            </div>
          </div>
      </main>
    );
  }
}

export default Cart;
