import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(`- Teste se é renderizado um card com as 
informações de determinado pokémon.`, () => {
  test('- Os dados corretos do Pokémon deve ser mostrado na tela; ', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/Average weight/i);

    const image = screen.getByAltText(/sprite/i);

    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageSrc);
  });

  test(`- Teste se o card do Pokémon indicado na Pokédex contém um link de navegação 
  para exibir detalhes deste Pokémon. O link deve possuir a URL "/pokemons/<id>", 
  onde "<id>" é o id do Pokémon exibido;`, () => {
    const { history } = renderWithRouter(<App />);

    const name = { name: /More details/i };
    const pokemonDetails = screen.getByRole('link', name);
    expect(pokemonDetails).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(pokemonDetails);

    expect(history.location.pathname).toBe('/pokemons/25');

    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(buttonBug);

    const pokemonDetails1 = screen.getByRole('link', name);
    expect(pokemonDetails1).toHaveAttribute('href', '/pokemons/10');

    userEvent.click(pokemonDetails1);

    expect(history.location.pathname).toBe('/pokemons/10');
  });

  test(`- Teste se o usuário pode favoritar um pokémon através 
  da página de detalhes.`, () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokeDetails);

    const pokemonFavorite = screen.getByRole('checkbox');
    userEvent.click(pokemonFavorite);

    const favoriteImage = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
