import React from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";
import CartButton from "../components/CartButton";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import magasin from '../images/Magasin.png';
import {
  getCategories,
  getProductsFromCategoryAndQuery
} from "../services/api";

class Home extends React.Component {
  constructor() {
    super();
    const cartItems = JSON.parse(localStorage.getItem("cartTrybe"));
    this.state = {
      categoriesList: [],
      selectedCategory: "",
      loadingCategory: true,
      nomeProdutoPesquisado: "",
      listaProdutos: [],
      cartQuantity: cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.cartQuantityChange = this.cartQuantityChange.bind(this);
  }

  async componentDidMount () {
    window.scrollTo( 0, 0 );
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
      loadingCategory: false,
    });
  }

  onChangeInput = ({ target }) => {
    const { value } = target;
    this.setState({
      nomeProdutoPesquisado: value,
    });
  };

  onCategoryChange(event) {
    const { nomeProdutoPesquisado } = this.state;
    const { value } = event.target;
    this.setState(
      {
        selectedCategory: value,
      },
      async () => {
        const listaProduto = await getProductsFromCategoryAndQuery(
          value,
          nomeProdutoPesquisado
        );
        this.setState( {
          listaProdutos: listaProduto.results,
        } );
      },
      
      
    );
  }

  onSubmitSearch = async () => {
    const { selectedCategory, nomeProdutoPesquisado } = this.state;
    const listaProduto = await getProductsFromCategoryAndQuery(
      selectedCategory,
      nomeProdutoPesquisado,
    );
    this.setState({
      listaProdutos: listaProduto.results,
      nomeProdutoPesquisado:"",
    } );
  };

  cartQuantityChange() {
    this.setState(({ cartQuantity: oldCartQuantity }) => ({
      cartQuantity: oldCartQuantity + 1,
    }));
  }

  render() {
    const {
      nomeProdutoPesquisado,
      listaProdutos,
      cartQuantity,
      categoriesList,
      loadingCategory,
      selectedCategory,
    } = this.state;
    return (
      <main>
        <Navbar
          className="navbar"
          color="white"
          expand="md"
          light
        >
          <NavbarBrand className="brand" href="/">
            <img src={magasin} alt="magasin-logo" width="200" />
          </NavbarBrand>
          <div class="input-group mb-3 centralizar">
        <div class="input-group-prepend">
            <button
              class="btn btn-outline-info"
              type="button"
              onClick={ this.onSubmitSearch }><BsSearch/>
            </button>
        </div>
          <input
            type="text" class="form-control"
            value={ nomeProdutoPesquisado }
            id="pesquisa"
            onChange={this.onChangeInput}
            placeholder="Pesquise por categorias ou produtos"
          />
      </div>
          <CartButton cartQuantity={ cartQuantity } />
        </Navbar>
     
      <br />

        <Container className="bg-light border" fluid="xl">
          <Row>
            <Col xs={5} className="bg-info border" sm="3">
              <br />
              <h5>Categorias</h5>
              <br />
              {loadingCategory ? (
                <p>Carregando...</p>
              ) : (
                <Categories
                  categoriesList={categoriesList}
                  onChange={this.onCategoryChange}
                  selected={selectedCategory}
                />
              )}
            </Col>
            <Col xs={5} className="bg-light border" sm="9">
                <ProductCard
                  listaProdutos={listaProdutos}
                  cartQuantityChange={this.cartQuantityChange}
                />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default Home;
