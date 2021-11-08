import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente Not Found', () => {
  test(`- Teste se página contém um heading "h2" com o 
  texto "Page requested not found 😭";`, () => {
    renderWithRouter(<NotFound />);

    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('- Teste se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.', () => {
    renderWithRouter(<NotFound />);
    const getImage = screen.getByAltText(/Pikachu crying because/i);
    const altImage = 'Pikachu crying because the page requested was not found';
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getImage).toHaveAttribute('src', image);
    expect(getImage).toHaveAttribute('alt', altImage);
  });
});
