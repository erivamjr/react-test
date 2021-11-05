import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// Caminho Feliz!!!
describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('- Conter os links respectivos com texto `Home`, About, Favorite Pokémons', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByText(/Home/i);
      expect(homeLink).toBeInTheDocument();
      const aboutLink = screen.getByText(/About/i);
      expect(aboutLink).toBeInTheDocument();
      const favoriteLink = screen.getByText(/Favorite Pokémons/i);
      expect(favoriteLink).toBeInTheDocument();
    });

    test('- Teste de redirecionamento ao clicar no link `Home`.', () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test('- Teste de redirecionamento ao clicar no link `About`.', () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toBeInTheDocument();
      userEvent.click(aboutLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test('- Teste de redirecionamento ao clicar no link `Favorite`.', () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    test('- Teste de redirecionamento ao clicar no link `Not Found`.', () => {
      const { history } = renderWithRouter(<App />);
      // console.log(history);
      history.push('/not-found');

      const { pathname } = history.location;
      expect(pathname).toBe('/not-found');

      const notFoundLink = screen.getByRole('heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      });

      expect(notFoundLink).toBeInTheDocument();
    });
  });
