import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';

class Categories extends Component {
  render() {
    const { categoriesList, onChange } = this.props;
    return (
      <section>
        {
          categoriesList.map( ( category ) => (
            <FormGroup
              check
            >
              <label key={ category.id } htmlFor={ category.id } data-testid="category">
                <input
                  name="categories"
                  type="radio"
                  id={ category.id }
                  value={ category.id }
                  onChange={ onChange }
                />
                { category.name }
              </label>
            </FormGroup>
          ))
        }
      </section>
    );
  }
}

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Categories;
