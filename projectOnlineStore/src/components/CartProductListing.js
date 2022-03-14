import React from 'react';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

class CartProductListing extends React.Component {
  render() {
    const { cartList, quantityChange } = this.props;
    return (
      <section>
        {cartList.map(({ product, quantity }) => (
          <CartProductCard
            key={ product.id }
            product={ product }
            quantity={ quantity }
            quantityChange={ quantityChange }
            shipping={ product.shipping.free_shipping }
          />
        ))}
      </section>
    );
  }
}

CartProductListing.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantityChange: PropTypes.func.isRequired,
};

export default CartProductListing;
