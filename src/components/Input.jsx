import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { type, nameInput, dataTestid, label, value, onChange } = this.props;
    return (
      <label htmlFor={ nameInput }>
        {label}
        <input
          type={ type }
          name={ nameInput }
          id={ nameInput }
          data-testid={ dataTestid }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
