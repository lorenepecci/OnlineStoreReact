import React from 'react';
import InputMask from 'react-input-mask';

class FinishedPurchase extends React.Component {
  constructor() {
    super();
    this.state = {
      NomeCompleto: '',
      Email: '',
      Cpf: '',
      tel: '',
      Cep: '',
      Address: '',
      complement: '',
      cidade: '',
      numero: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: [value],
    });
  }

  render() {
    const {
      NomeCompleto,
      Email,
      Cpf,
      tel,
      Cep,
      Address,
      complement,
      cidade,
      numero,
    } = this.state;
    return (
      <div>
        
        <h2>Informações do Comprador </h2>
        <form>
          <label htmlFor="Nome Completo">
            <input
              data-testid="checkout-fullname"
              type="text"
              id="Nome Completo"
              onChange={ this.onInputChange }
              name="NomeCompleto"
              placeholder="Nome Completo"
              value={ NomeCompleto }
              required
            />
          </label>
          <label htmlFor="Email">
            <input
              data-testid="checkout-email"
              type="text"
              id="Email"
              onChange={ this.onInputChange }
              name="Email"
              placeholder="Email"
              value={ Email }
              required
            />
          </label>
          <label htmlFor="cpf">
            <InputMask
              data-testid="checkout-cpf"
              type="text"
              id="cpf"
              onChange={ this.onInputChange }
              name="Cpf"
              placeholder="CPF"
              value={ Cpf }
              mask="999.999.999-99"
              required
            />
          </label>
          <label htmlFor="tel">
            <InputMask
              data-testid="checkout-phone"
              type="tel"
              pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
              id="tel"
              onChange={ this.onInputChange }
              name="tel"
              placeholder="Telefone"
              value={ tel }
              mask="(99)99999-9999"
              required
            />
          </label>
          <label htmlFor="cep">
            <InputMask
              data-testid="checkout-cep"
              type="text"
              id="cep"
              onChange={ this.onInputChange }
              name="Cep"
              placeholder="CEP"
              value={ Cep }
              mask="99999-999"
              required
            />
          </label>
          <label htmlFor="address">
            <input
              data-testid="checkout-address"
              type="text"
              id="address"
              onChange={ this.onInputChange }
              name="Address"
              placeholder="Endereço"
              value={ Address }
              required
            />
          </label>
          <label htmlFor="complement">
            <input
              type="text"
              id="complement"
              onChange={ this.onInputChange }
              name="complement"
              placeholder="Complemento"
              value={ complement }
              required
            />
          </label>
          <label htmlFor="numero">
            <input
              type="text"
              id="numero"
              onChange={ this.onInputChange }
              name="numero"
              placeholder="Numero"
              value={ numero }
              required
            />
          </label>
          <label htmlFor="cidade">
            <input
              type="text"
              id="cidade"
              onChange={ this.onInputChange }
              name="cidade"
              placeholder="Cidade"
              value={ cidade }
              required
            />
          </label>
        </form>
      </div>
    );
  }
}

export default FinishedPurchase;
