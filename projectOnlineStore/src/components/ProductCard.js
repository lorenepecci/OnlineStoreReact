import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "reactstrap";
import FreteGratis from "../images/FreteGratis.png";

class ProductCard extends React.Component {
  componentDidMount () {
    window.scrollTo( 0, 0 );
  }
  handleClick = (product) => {
    const { cartQuantityChange } = this.props;
    const cart = JSON.parse(localStorage.getItem("cartTrybe"));
    if (cart.some((cartItem) => cartItem.product.id === product.id)) {
      cart.forEach((cartItem, index) => {
        if (cartItem.product.id === product.id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({
        product,
        quantity: 1,
      });
    }
    localStorage.setItem("cartTrybe", JSON.stringify(cart));
    cartQuantityChange();
    window.scrollTo( 0, 0 );
  };

  render() {
    const { listaProdutos} = this.props;
    return (
      <div>
        <Container className=" border" fluid="xl">
          <Row>
          {listaProdutos.map((produto, index) => (
            
            <Col xs={ 5 } className="itens border" sm="2" xs="1" md="4">
              <Card body className='centerCard'>
                <span>
                  {produto.shipping.free_shipping && (
                    <img
                      className='imgFrete'
                      src={FreteGratis}
                      alt=" Frete Gratis"
                      width={50}
                      data-testid="free-shipping"
                    />
                ) }
                <Link
                    data-testid="product-detail-link"
                    to={`/detalhe/${produto.id}`}
                  >
                  <img
                    className="centralizarimg"
                    src={produto.thumbnail.replace('I', 'W')}
                    alt={produto.title}
                    width="150"
                    height="200"
                    />
                    <h5>{produto.title}</h5>
                  <h5>R$: {produto.price.toFixed(2)}</h5>
                </Link>
                <button
                    class="botaoitens btn btn-info"
                    id={produto.id}
                    type="button"
                    onClick={() => this.handleClick(produto)}
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                </button>
                    
                </span>
                </Card>
              </Col>
          ) ) }
            </Row>
        </Container>
      </div>
    );
  }
}

ProductCard.propTypes = {
  listaProdutos: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartQuantityChange: PropTypes.func.isRequired,
};

export default ProductCard;
