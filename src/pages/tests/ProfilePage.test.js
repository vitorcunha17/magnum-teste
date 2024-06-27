import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import HomePage from "../HomePage";

describe("HomePage", () => {
  test("renders welcome message with user email", () => {
    const email = "test@example.com";

    render(
      <UserContext.Provider value={{ fetchUser: jest.fn().mockResolvedValue({ email }) }}>
        <HomePage />
      </UserContext.Provider>
    );

    expect(screen.getByText(`Bem-vindo!\n${email}`)).toBeInTheDocument();
  });

  test("renders 'Cadastrar senha de transação' button", () => {
    render(
      <UserContext.Provider value={{ fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    expect(screen.getByRole("button", { name: "Cadastrar senha de transação" })).toBeInTheDocument();
  });

  test("opens dialog when 'Cadastrar senha de transação' button is clicked", () => {
    render(
      <UserContext.Provider value={{ fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar senha de transação" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("closes dialog when 'Cancelar' button is clicked", () => {
    render(
      <UserContext.Provider value={{ fetchUser: jest.fn() }}>
        <HomePage />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar senha de transação" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls addTransactionPassword when 'Confirmar' button is clicked with valid passwords", () => {
    const addTransactionPassword = jest.fn().mockResolvedValue();
    const password = "password";
    const confirmPassword = "password";

    render(
      <UserContext.Provider value={{ fetchUser: jest.fn(), addTransactionPassword }}>
        <HomePage />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar senha de transação" }));
    fireEvent.change(screen.getByLabelText("Senha de transação"), { target: { value: password } });
    fireEvent.change(screen.getByLabelText("Confirmar senha de transação"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(addTransactionPassword).toHaveBeenCalledWith(password, confirmPassword);
  });

  test("does not call addTransactionPassword when 'Confirmar' button is clicked with invalid passwords", () => {
    const addTransactionPassword = jest.fn().mockResolvedValue();
    const password = "";
    const confirmPassword = "";

    render(
      <UserContext.Provider value={{ fetchUser: jest.fn(), addTransactionPassword }}>
        <HomePage />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar senha de transação" }));
    fireEvent.change(screen.getByLabelText("Senha de transação"), { target: { value: password } });
    fireEvent.change(screen.getByLabelText("Confirmar senha de transação"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(addTransactionPassword).not.toHaveBeenCalled();
  });
});