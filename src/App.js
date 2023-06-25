import React from 'react';
import './App.css';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    nameInput: '',
    descricaoCarta: '',
    atributoCarta1: '0',
    atributoCarta2: '0',
    atributoCarta3: '0',
    imageInput: '',
    raridadeInput: 'normal',
    superTrunfo: false,
    savedCards: [],
    hasTrunfo: false,
    filterName: '',
    filterRaridade: 'todas',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSaveCard = (event) => {
    event.preventDefault();
    const { nameInput, descricaoCarta, atributoCarta1, atributoCarta2,
      atributoCarta3, imageInput, raridadeInput, superTrunfo } = this.state;
    const newCard = {
      nameInput,
      descricaoCarta,
      atributoCarta1,
      atributoCarta2,
      atributoCarta3,
      imageInput,
      raridadeInput,
      superTrunfo,
    };
    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, newCard],
      nameInput: '',
      descricaoCarta: '',
      imageInput: '',
      atributoCarta1: '0',
      atributoCarta2: '0',
      atributoCarta3: '0',
      raridadeInput: 'normal',
      superTrunfo: false,
      hasTrunfo: prevState.superTrunfo ? prevState.superTrunfo : prevState.hasTrunfo,
    }));
  };

  isSaveButtonDisabled = () => {
    const { nameInput, descricaoCarta, atributoCarta1, atributoCarta2,
      atributoCarta3, imageInput } = this.state;
    const isNameValid = nameInput.length > 0;
    const isDesValid = descricaoCarta.length > 0;
    const isImageValid = imageInput.length > 0;
    const lengthAtribute = 90;
    const somaAtribute = 210;
    const isAtt1Valid = (atributoCarta1 <= lengthAtribute) && (atributoCarta1 >= 0);
    const isAtt2Valid = (atributoCarta2 <= lengthAtribute) && (atributoCarta2 >= 0);
    const isAtt3Valid = (atributoCarta3 <= lengthAtribute) && (atributoCarta3 >= 0);
    const isAttValid = (Number(atributoCarta1) + Number(atributoCarta2)
      + Number(atributoCarta3)) <= somaAtribute;
    const validation = isNameValid && isDesValid && isImageValid && isAtt1Valid
      && isAtt2Valid && isAtt3Valid && isAttValid;
    return validation;
  };

  handleDeleteCard = (indexCard) => {
    const { savedCards } = this.state;
    const cards = savedCards.slice();
    cards.splice(indexCard, 1);
    const trunfoIsTrue = cards.some(({ hasTrunfo }) => hasTrunfo === true);
    this.setState(() => ({
      savedCards: cards,
      hasTrunfo: trunfoIsTrue ? false : trunfoIsTrue,
    }));
  };

  render() {
    const { nameInput, descricaoCarta, atributoCarta1, atributoCarta2, atributoCarta3,
      imageInput, raridadeInput, superTrunfo, hasTrunfo, savedCards,
      filterName, filterRaridade } = this.state;
    return (
      <main>
        <Form
          cardName={ nameInput }
          cardDescription={ descricaoCarta }
          cardAttr1={ atributoCarta1 }
          cardAttr2={ atributoCarta2 }
          cardAttr3={ atributoCarta3 }
          cardImage={ imageInput }
          cardRare={ raridadeInput }
          cardTrunfo={ superTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ !this.isSaveButtonDisabled() }
          onSaveButtonClick={ this.handleSaveCard }
          hasTrunfo={ hasTrunfo }
        />

        <section className="preview__card">
          <h2>PRÉ-VISUALIZAÇÃO</h2>
          <Card
            cardName={ nameInput }
            cardDescription={ descricaoCarta }
            cardAttr1={ atributoCarta1 }
            cardAttr2={ atributoCarta2 }
            cardAttr3={ atributoCarta3 }
            cardImage={ imageInput }
            cardRare={ raridadeInput }
            cardTrunfo={ superTrunfo }
          />
        </section>

        <section className="baralho__cards">
          <h3>TODAS AS CARTAS</h3>
          <label htmlFor="filter-name">
            Filtrar por nome:
            <input
              type="text"
              name="filterName"
              id="filter-name"
              data-testid="name-filter"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="filter-raridade">
            Filtrar por raridade:
            <select
              name="filterRaridade"
              id="filter-raridade"
              data-testid="rare-filter"
              onChange={ this.onInputChange }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>

          {savedCards
            .filter((card) => card.nameInput.toLowerCase()
              .includes(filterName.toLowerCase()))
            .filter((card) => filterRaridade === 'todas'
              || card.raridadeInput === filterRaridade)
            .map((card, index) => (
              <div key={ card.nameInput }>
                <Card
                  cardName={ card.nameInput }
                  cardDescription={ card.descricaoCarta }
                  cardAttr1={ card.atributoCarta1 }
                  cardAttr2={ card.atributoCarta2 }
                  cardAttr3={ card.atributoCarta3 }
                  cardImage={ card.imageInput }
                  cardRare={ card.raridadeInput }
                  cardTrunfo={ card.superTrunfo }
                />
                <button
                  onClick={ () => this.handleDeleteCard(index) }
                  data-testid="delete-button"
                >
                  Excluir
                </button>
              </div>
            ))}
        </section>

      </main>
    );
  }
}

export default App;
