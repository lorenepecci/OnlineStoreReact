import React from "react";
import { Col, Navbar, NavbarBrand, Row, Alert } from "reactstrap";
import CartSummary from "../components/CartSummary";
import FinishedPurchase from "../components/FinishedPurchase";
import PaymentMethod from "../components/PaymentMethod";
import magasin from "../images/Magasin.png";

class Checkout extends React.Component {
  constructor () {
    super();
    this.state = {
      success: false ,
    }
  }
  componentDidMount() {
    window.scrollTo( 0, 0 );
  }

  handleCLick = () => {
    localStorage.setItem("cartTrybe", JSON.stringify([]));
    this.setState({ success: true })
  }
  
  render() {
    return (
      <div>
        <Navbar className="navbar" color="white" expand="md" light>
          <NavbarBrand className="brand" href="/">
            <img src={magasin} alt="magasin-logo" width="200" />
          </NavbarBrand>
        </Navbar>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h2 class="display-4">Finalizar Compra</h2>
            <Col xs={12} className=" border" sm="12">
              <Row>
                <CartSummary />
              </Row>
              <Row>
                <FinishedPurchase />
              </Row>
              <Row>
                <PaymentMethod />
              </Row>
            </Col>
            <button
              class="btn btn-info buttonfinalizar"
              type="button"
              onClick={this.handleCLick}
            >
              Comprar
            </button>
            { ( this.state.success ) ?
              <Alert color="success">
                Sua compra foi efetuada com Sucesso! 
            </Alert> : null
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
