import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import LoginPage from "../LoginPage";

describe("LoginPage", () => {
  test("renders login form", () => {
    render(
      <AuthContext.Provider value={{ login: jest.fn() }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();  
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(
      screen.getByText("Não tem uma conta? Registre-se aqui")
    ).toBeInTheDocument();
  });

  test("validates form on submit", () => {
    render(
      <AuthContext.Provider value={{ login: jest.fn() }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByText("E-mail obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha obrigatória")).toBeInTheDocument();
  });

  test("calls login function on valid form submit", () => {
    const loginMock = jest.fn();

    render(
      <AuthContext.Provider value={{ login: loginMock }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
