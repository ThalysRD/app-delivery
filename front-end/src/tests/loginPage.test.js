import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import {
  loginButton,
  registerButton,
  emailInput,
  passwordInput,
} from './testIds/loginPageTestIds';

describe('Testa a página de login', () => {
  describe('1 --- Testa se os elementos existem', () => {
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

      const buttonLoginElement = screen.getByTestId(loginButton);
      const buttonRegisterElement = screen.getByTestId(registerButton);

      expect(buttonLoginElement).toBeInTheDocument();
      expect(buttonRegisterElement).toBeInTheDocument();
    });
  });

  describe('2 --- Testa se os elementos se comportam da maneira correta', () => {
    test('se o botão de Login começa desabilitado para clicar', () => {
      render(<Login />);

      const buttonLoginElement = screen.getByTestId(loginButton);

      expect(buttonLoginElement).toHaveAttribute('disabled');
    });

    let description1 = 'se o botão de Login continua desabilitado mesmo';
    let description2 = ' após um email inválido e uma senha curta seja descrita';
    test(description1 + description2, () => {
      render(<Login />);

      const buttonLoginElement = screen.getByTestId(loginButton);
      const inputEmailElement = screen.getByTestId(emailInput);
      const inputPasswordElement = screen.getByTestId(passwordInput);

      userEvent.type(inputEmailElement, 'emaiNãoVálido');
      userEvent.type(inputPasswordElement, 'SNV');

      expect(buttonLoginElement).toBeDisabled();
    });

    description1 = 'se o botão de Login habilita após';
    description2 = ' um email válida e uma senha longa seja descrita';
    test(description1 + description2, () => {
      render(<Login />);

      const buttonLoginElement = screen.getByTestId(loginButton);
      const inputEmailElement = screen.getByTestId(emailInput);
      const inputPasswordElement = screen.getByTestId(passwordInput);

      userEvent.type(inputEmailElement, 'emailValido@gmail.com');
      userEvent.type(inputPasswordElement, 'senhaValida');

      expect(buttonLoginElement).toBeEnabled();
    });
  });
});
