import React from "react";
import { render, screen } from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import HomePage from "../HomePage";

describe("HomePage", () => {
  test("renders welcome message with user email", () => {
    const email = "test@example.com";

    render(
      <UserContext.Provider value={{ fetchBalance: jest.fn(), fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    expect(screen.getByText(`Bem-vindo!\n${email}`)).toBeInTheDocument();
  });

  test("renders balance correctly", () => {
    const balance = 1000;

    render(
      <UserContext.Provider value={{ fetchBalance: jest.fn(), fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    expect(screen.getByText(`R$${balance}`)).toBeInTheDocument();
  });

  test("renders HistoryPage component", () => {
    render(
      <UserContext.Provider value={{ fetchBalance: jest.fn(), fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    expect(screen.getByTestId("history-page")).toBeInTheDocument();
  });
});