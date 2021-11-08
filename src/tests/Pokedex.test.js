import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando se tem H2 com texto', () => {
  test(`- Teste se página contém um heading "h2" com 
  o texto "Encountered pokémons."`, () => {
    renderWithRouter(<App />);

    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });
});

describe(`- Teste se é exibido o próximo Pokémon da lista quando o 
botão Próximo pokémon é clicado.`, () => {
  test('- O botão deve conter o texto `Próximo pokémon`;', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  test(`- Os próximos Pokémons da lista devem ser mostrados, um a
  um, ao clicar sucessivamente no botão;`, () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);

    const charmanderImage = screen.getByAltText(/Charmander sprite/i);
    expect(charmanderImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const caterpieImage = screen.getByAltText(/Caterpie sprite/i);
    expect(caterpieImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const ekansImage = screen.getByAltText(/Ekans sprite/i);
    expect(ekansImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const alakazamImage = screen.getByAltText(/Alakazam sprite/i);
    expect(alakazamImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const mewImage = screen.getByAltText(/Mew sprite/i);
    expect(mewImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const rapidashImage = screen.getByAltText(/Rapidash sprite/i);
    expect(rapidashImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const snorlaxImage = screen.getByAltText(/Snorlax sprite/i);
    expect(snorlaxImage).toBeInTheDocument();

    userEvent.click(buttonNext);

    const dagronairImage = screen.getByAltText(/Dragonair sprite/i);
    expect(dagronairImage).toBeInTheDocument();
  });

  test(`- O primeiro Pokémon da lista deve ser mostrado ao clicar no
  botão, se estiver no último Pokémon da lista;`, () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    const pikachuImage = screen.getByAltText('Pikachu sprite');
    expect(pikachuImage).toBeInTheDocument();
  });
});
describe('Testando visualização do Pokemon', () => {
  test('- Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByText('More details');
    expect(pokemon.length).toBe(1);
  });
});

describe('- Teste se a Pokédex tem os botões de filtro.', () => {
  test(`- Deve existir um botão de filtragem para cada 
  tipo de Pokémon, sem repetição.`, () => {
    renderWithRouter(<App />);

    const pokemons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemons[0]).toBeInTheDocument();
    const NUMBER_LENGTH = 7;
    expect(pokemons).toHaveLength(NUMBER_LENGTH);

    const pokemonsType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    pokemonsType.forEach((pokemon, index) => {
      expect(pokemons[index]).toHaveTextContent(pokemon);
    });
  });

  test(`- A partir da seleção de um botão de tipo, a Pokédex 
  deve circular somente pelos pokémons daquele tipo;`, () => {
    renderWithRouter(<App />);

    const filterPsychic = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(filterPsychic);

    const alakazam = screen.getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);

    const mew = screen.getByText(/Mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(alakazam).toBeInTheDocument();

    const filterAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(filterAll);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});

describe('- Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('- O texto do botão deve ser "All";', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
  });

  test(`- A Pokedéx deverá mostrar os Pokémons normalmente 
  (sem filtros) quando o botão /All/i for clicado;`, () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(allButton);
    const pikachuImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pikachuImage).toBeInTheDocument();
  });
});
