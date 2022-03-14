import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FreteGratis from '../images/FreteGratis.png';
import { Col, Row } from "reactstrap";

class CartProductCard extends Component {
  stockValidate = (product, quantity) => {
    if (product.available_quantity <= quantity) {
      return true;
    }
    return false;
  }

  render() {
    const { product, quantity, quantityChange, shipping } = this.props;
    return (
      <div>
        <h5 data-testid="shopping-cart-product-name">
          {product.title}
        </h5>
        <Row>
            <Col xs={ 6 } className="border" sm="6">
        {(shipping)
              && <img
            className="cartphoto" 
            src={ FreteGratis }
            alt=" Frete Gratis"
            width={ 50 }

          /> }
            <img className="cartphoto" src={ product.thumbnail } alt={ product.title } width="150"/>
          </Col>
          <Col xs={ 6 } className="border centralizarCart" sm="6">
            <p>
              {`Quantidade: ${quantity}`}
            </p>
            <button
              class="btn btn-info"
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => quantityChange(product, 'decrease') }
            >
              -
            </button>
            <button
              class="btn btn-info"
              type="button"
              onClick={ () => quantityChange(product, 'remove') }
              name="remove"
            >
              x
            </button>
            <button
              class="btn btn-info"
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => quantityChange(product, 'increase') }
              disabled={ this.stockValidate(product, quantity) }
            >
              +
            </button>
            </Col>
        </Row>
      </div>
    );
  }
}

CartProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  quantityChange: PropTypes.func.isRequired,
  shipping: PropTypes.bool.isRequired,
};

export default CartProductCard;
