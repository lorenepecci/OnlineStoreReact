import React from 'react';
import boleto from '../images/boleto.png';
import elo from '../images/elo.png';
import mastercard from '../images/mastercard.jpg';
import visa from '../images/visa.png';

class PaymentMethod extends React.Component {
  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: [value],
    });
  }

  render() {
    return (
      <div>
        <h2>Método de Pagamento </h2>
        <form>
          <label htmlFor="Pagamento">
            <h4>Boleto</h4>
            <input
              type="radio"
              onChange={ this.onInputChange }
              name="Pagamento"
              value="Boleto"
            />
            <img src={ boleto } alt="boleto" width="50" height="50" />
            <h4>Cartão</h4>
            <input
              type="radio"
              onChange={ this.onInputChange }
              name="Pagamento"
              value="CartaoVISA"
            />
            <img src={ visa } alt="boleto" width="50" height="50" />
            <input
              type="radio"
              onChange={ this.onInputChange }
              name="Pagamento"
              value="CartaoMC"
            />
            <img src={ mastercard } alt="boleto" width="50" height="50" />
            <input
              type="radio"
              onChange={ this.onInputChange }
              name="Pagamento"
              value="CartaoELO"
            />
            <img src={ elo } alt="boleto" width="50" height="50" />
          </label>
        </form>

      </div>
    );
  }
}

export default PaymentMethod;
