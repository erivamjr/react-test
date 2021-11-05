import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderwithRouter from '../renderWithRouter';

// Caminho Feliz!!!
describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('Conter os links consecutivos com texto `Home`, About, Favorite Pokémons', () => {
      renderwithRouter(<App />);
      const homeLink = screen.getByText(/Home/i);
      expect(homeLink).toBeInTheDocument();
      const aboutLink = screen.getByText(/About/i);
      expect(aboutLink).toBeInTheDocument();
      const favoriteLink = screen.getByText(/Favorite Pokémons/i);
      expect(favoriteLink).toBeInTheDocument();
    });
  });
