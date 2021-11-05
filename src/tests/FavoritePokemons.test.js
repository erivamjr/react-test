import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando Not Found', () => {
  test('- Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = screen.getByText('No favorite pokemon found');
    expect(notFoundFavorite).toBeInTheDocument();
  });

  test('- Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const pikachuDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pikachuDetails);

    const favoriteCheck = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteCheck);

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);
    const pikachuImage = screen.getByText('Pikachu');
    expect(pikachuImage).toBeInTheDocument();
  });
});
