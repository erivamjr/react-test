import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando Componente About', () => {
  test('- Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutInfo = screen.getByText(/This application simulates/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  test('- Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    renderWithRouter(<About />);
    const titleH2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(titleH2).toBeInTheDocument();
  });

  test('- Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/simulates a pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/filter pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('- Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.', () => {
    renderWithRouter(<About />);
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img');
    const { src } = imgAbout;
    expect(src).toBe(image);
  });
});
