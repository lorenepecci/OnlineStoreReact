import PropTypes from 'prop-types';
import React from 'react';
import starImage from '../images/starpreta.jpg';

class PreviousReviews extends React.Component {
  countStars = (quantityStars) => {
    const listQuantity = [];
    for (let i = 1; i <= Number(quantityStars); i += 1) {
      listQuantity.push(i);
    }
    return listQuantity;
  }

  render() {
    const { list } = this.props;
    return (
      <div className="avaliation but spaceBotton" >
        <h3 className="justo"> Avaliações do Produto({list.length})</h3>
        <hr/>
        {(list !== [])
          && list.map((avaliation, index) => (
            <div key={ index }>
              <p className="justo">
                { avaliation.email }
              </p>

              { this.countStars(avaliation.stars).map((star) => (
                <span key={ star }>
                  <img
                    src={ starImage }
                    alt={ star }
                    width="20"
                    height="20"
                  />
                </span>
              ))}

              <p>
                {avaliation.textarea}
              </p>
              <hr/>
            </div>
          ))}
      </div>
    );
  }
}

PreviousReviews.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PreviousReviews;
