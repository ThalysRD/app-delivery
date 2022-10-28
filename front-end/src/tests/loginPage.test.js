import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Testa a página de login', () => {
  test('se o campo para preencher o email existe', () => {
    render(<Login />);

    const emailElement = screen.getByLabelText('Email:');

    expect(emailElement).toBeInTheDocument();
  });

  test('se o campo para preencher a senha existe', () => {
    render(<Login />);

    const passwordElement = screen.getByLabelText('Password:');

    expect(passwordElement).toBeInTheDocument();
  });

  test('se os botões de login e register existem', () => {
    render(<Login />);

    const buttonLoginElement = screen.getByTestId('common_login__button-login');
    const buttonRegisterElement = screen.getByTestId('common_login__button-register');

    expect(buttonLoginElement).toBeInTheDocument();
    expect(buttonRegisterElement).toBeInTheDocument();
  });
});
