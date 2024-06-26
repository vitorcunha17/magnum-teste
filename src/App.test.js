import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import React from 'react';

test("renders pages", () => {
  render(<App />);
  const linkElement = screen.getByText(/Carregando/i);
  expect(linkElement).toBeInTheDocument();
});
