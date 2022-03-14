import PropTypes from "prop-types";
import React from "react";
import { Alert, Col, Navbar, NavbarBrand, Row } from "reactstrap";
import CartButton from "../components/CartButton";
import PreviousReviews from "../components/PreviousReviews";
import magasin from "../images/Magasin.png";
import { getProductsID } from "../services/api";

class DetailedProduct extends React.Component {
  constructor() {
    super();
    const cartItems = JSON.parse(localStorage.getItem("cartTrybe"));
    this.state = {
      productData: {},
      img:'',
      arrayAttributes: [],
      email: "",
      textarea: "",
      stars: 0,
      listProductID: [],
      success:false,
      cartQuantity: cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
    };
    this.cartQuantityChange = this.cartQuantityChange.bind(this);
  }
 
  componentDidMount () {
    window.scrollTo( 0, 0 );
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.onSubmitSearch(id);
    this.getProductAvaliation(id);
  }

  getProductAvaliation = (id) => {
    const userAvaliationList = JSON.parse(
      localStorage.getItem("userAvaliationList")
    );
    const objProductID = userAvaliationList.find(
      (avaliationObj) => avaliationObj.id === id
    );
    if (objProductID) {
      this.setState({
        listProductID: objProductID.avaliation,
      });
    }
  };

  onSubmitSearch = async (id) => {
    const productData = await getProductsID( id );
    const imge = productData.thumbnail.replace( 'I', 'W' );
    this.setState( { productData, arrayAttributes: productData.attributes , img:imge} );
    console.log(productData)
  };

  handleClick = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartTrybe"));
    if (cart.some((cartItem) => cartItem.product.id === product.id)) {
      cart.forEach((cartItem, index) => {
        if (cartItem.product.id === product.id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem( "cartTrybe", JSON.stringify( cart ) );
    this.setState({ success: true })
    this.cartQuantityChange();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: [value] });
  };

  onClickForm = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { email, textarea, stars } = this.state;
    const userAvaliationList = JSON.parse(
      localStorage.getItem("userAvaliationList")
    );
    const objAvaliation = { email, textarea, stars };
    const objDoLocalstorage = { id, avaliation: [objAvaliation] };
    if (!userAvaliationList) {
      userAvaliationList.push(objDoLocalstorage);
    } else if (userAvaliationList.some((avaliation) => avaliation.id === id)) {
      userAvaliationList.forEach((avaliationObj, index) => {
        if (avaliationObj.id === id) {
          userAvaliationList[index].avaliation.push(objAvaliation);
        }
      });
    } else {
      userAvaliationList.push(objDoLocalstorage);
    }
    localStorage.setItem(
      "userAvaliationList",
      JSON.stringify(userAvaliationList)
    );
    this.getProductAvaliation(id);
    this.setState({ email: "", textarea: "", stars: 0 });
  };

  cartQuantityChange() {
    this.setState(({ cartQuantity: oldCartQuantity }) => ({
      cartQuantity: oldCartQuantity + 1,
    }));
  }

  render() {
    const {
      productData,
      img,
      arrayAttributes,
      email,
      textarea,
      listProductID,
      cartQuantity,
      success
    } = this.state;
    return (
      <div>
        <Navbar className="navbar" color="white" expand="md" light>
          <NavbarBrand className="brand" href="/">
            <img src={magasin} alt="magasin-logo" width="200" />
          </NavbarBrand>
          <CartButton cartQuantity={cartQuantity} />
        </Navbar>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h2 class="display-4">Especificações Técnicas </h2>
            <br/>
            <Row>
              <Col xs={ 6 } className="bg-info border" sm="6">
              <div className="container1-detailedProduct"> 
                <img src={img} width="300" heigth="300" alt={productData.id} />
                <h2>
                  R$:
                  {productData.price}
                </h2>
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={() => this.handleClick(productData)}
                  id={productData.id}
                >
                  Adicionar ao Carrinho
                  </button>
                  {(success) && <Alert color="success">
                      Adicionado com Sucesso! Veja no Carrrinho!
                    </Alert>}
              </div>
              </Col>
              <Col xs={6} className=" border" sm="6">
            <h3  className="justo">{productData.title}</h3>
            <div className="especificacoes">
              {arrayAttributes.map((atribute, index) => (
                <div key={index}>
                    <span className="bold">{atribute.name}:</span><span>{atribute.value_name}</span>
                </div>
              ))}
              </div>
              </Col>
              </Row>
          </div>
        </div>

        
        <form className="avaliation">
        <h3 className="justo">Deixe sua Avaliação do Produto</h3>
        <div class="form-group">
              <input
                placeholder="Email"
                class="form-control"
                id="input1"
                value={email}
                name="email"
                type="text"
                onChange={this.handleChange}
              />
             
          </div>
      
          <div className=" spaceBotton star-rating__stars">
            <label htmlFor="1-rating" className="star-rating__label">
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={1}
                data-testid="1-rating"
                id="1-rating"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="2-rating" className="star-rating__label">
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={2}
                data-testid="2-rating"
                id="2-rating"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="3-rating" className="star-rating__label">
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={3}
                data-testid="3-rating"
                id="3-rating"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="4-rating" className="star-rating__label">
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={4}
                data-testid="4-rating"
                id="4-rating"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="5-rating" className="star-rating__label">
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={5}
                data-testid="5-rating"
                id="5-rating"
                onChange={this.handleChange}
              />
            </label>
          </div>
      
          <div class="form-group">
          <textarea
            placeholder="Mensagem (opcional)"
            class="form-control"
            name="textarea"
            value={textarea}
            onChange={this.handleChange}
            rows="3"
          />
        </div>
          <button
            class="btn btn-info"
            type="button"
            disabled={this.validateForm}
            onClick={this.onClickForm}
          >
            Avaliar
          </button>
          
        </form>
        <br />
        <hr/>
        <PreviousReviews list={listProductID} />
      </div>
    );
  }
}

DetailedProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailedProduct;
