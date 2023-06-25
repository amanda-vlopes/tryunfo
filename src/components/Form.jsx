import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from './Input';
import './Form.css';

export default class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo,
      isSaveButtonDisabled, onInputChange, onSaveButtonClick, hasTrunfo } = this.props;
    return (
      <div>
        <h2>ADICIONE NOVA CARTA</h2>
        <form action="">

          <Input
            type="text"
            nameInput="nameInput"
            dataTestid="name-input"
            label="Nome"
            value={ cardName }
            onChange={ onInputChange }
          />

          <label htmlFor="descricaoCarta">
            Descrição
            <textarea
              name="descricaoCarta"
              id="descricaoCarta"
              data-testid="description-input"
              cols="30"
              rows="10"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>

          <Input
            type="number"
            nameInput="atributoCarta1"
            dataTestid="attr1-input"
            label="Attr01"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />

          <Input
            type="number"
            nameInput="atributoCarta2"
            dataTestid="attr2-input"
            label="Attr02"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />

          <Input
            type="number"
            nameInput="atributoCarta3"
            dataTestid="attr3-input"
            label="Attr03"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />

          <Input
            type="text"
            nameInput="imageInput"
            dataTestid="image-input"
            label="Imagem"
            value={ cardImage }
            onChange={ onInputChange }
          />

          <label htmlFor="raridadeCarta">
            Raridade
            <select
              name="raridadeInput"
              id="raridadeInput"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>

          {hasTrunfo ? (
            <p>Você já tem um Super Trunfo em seu baralho</p>
          )
            : (
              <label htmlFor="superTrunfo">
                <input
                  type="checkbox"
                  name="superTrunfo"
                  id="superTrunfo"
                  data-testid="trunfo-input"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
                Super Trybe Trunfo
              </label>)}

          <button
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            SALVAR
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
};
