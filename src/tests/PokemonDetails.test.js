import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`- Teste se as informações detalhadas do Pokémon 
selecionado são mostradas na tela.`, () => {
  test(`- A página deve conter um texto "<name> Details", 
  onde "<name>" é o nome do Pokémon;`, () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    expect(pokemonDetails).not.toBeInTheDocument();
    const name = 'Pikachu';
    // const name = screen.getByTestId('pokemon-name').value; queria pegar
    // o valor dinamico, mas não consegui
    const headingDetails = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(headingDetails).toBeInTheDocument();

    const titleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(titleSummary).toBeInTheDocument();

    const pokemonDescription = screen.getByText(/roasts hard berries with electricity/i);
    expect(pokemonDescription).toBeInTheDocument();
  });
});

describe(`- Teste se existe na página uma seção com os mapas 
contendo as localizações do pokémon`, () => {
  test(`- Na seção de detalhes deverá existir um heading "h2" com o 
  texto "Game Locations of <name>"; onde "<name>" é o nome do Pokémon exibido.`, () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const name = 'Pikachu';
    const HeadingH2 = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(HeadingH2).toBeInTheDocument();
  });
  test(`- Todas as localizações do Pokémon devem ser 
  mostradas na seção de detalhes;`, () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const mapLocation = screen.getAllByAltText(/location/i);
    expect(mapLocation).toHaveLength(2);
  });

  test(`- Devem ser exibidos, o nome da localização e uma imagem 
  do mapa em cada localização;`, () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const locationMapLeft = screen.getByText(/kanto viridian forest/i);
    expect(locationMapLeft).toBeInTheDocument();

    const locationMapRigth = screen.getByText(/kanto power plant/i);
    expect(locationMapRigth).toBeInTheDocument();

    const maps = screen.getAllByAltText(/Pikachu location/i);
    expect(maps.length).toBe(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test(`- Teste se o usuário pode favoritar um pokémon 
  através da página de detalhes.`, () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: /Pokémon Favoritado/i });
    expect(screen.queryByAltText(/marked as favorite/i)).not.toBeInTheDocument();

    userEvent.click(favoriteCheck);

    expect(screen.queryByAltText(/marked as favorite/i)).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    expect(screen.queryByAltText(/marked as favorite/i)).not.toBeInTheDocument();

    expect(favoriteCheck).toBeInTheDocument();
  });
});
