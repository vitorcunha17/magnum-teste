import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../RegisterPage";

describe("RegisterPage", () => {
  test("renders register form", () => {
    render(
      <AuthContext.Provider value={{ register: jest.fn() }}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrar" })).toBeInTheDocument();
    expect(screen.getByText("Já possui uma conta? Login")).toBeInTheDocument();
  });

  test("displays error messages for empty fields", () => {
    render(
      <AuthContext.Provider value={{ register: jest.fn() }}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    expect(screen.getByText("E-mail obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha obrigatória")).toBeInTheDocument();
    expect(screen.getByText("Confirmar senha obrigatório")).toBeInTheDocument();
  });

  test("calls register function with correct arguments when form is submitted", () => {
    const register = jest.fn().mockResolvedValue();
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "password";

    render(
      <AuthContext.Provider value={{ register }}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: email } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: password } });
    fireEvent.change(screen.getByLabelText("Confirmar Senha"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    expect(register).toHaveBeenCalledWith(email, password, confirmPassword);
  });

  test("navigates to login page after successful registration", async () => {
    const register = jest.fn().mockResolvedValue();
    const navigate = jest.fn();
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "password";

    render(
      <AuthContext.Provider value={{ register }}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: email } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: password } });
    fireEvent.change(screen.getByLabelText("Confirmar Senha"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    await screen.findByText("Já possui uma conta? Login");

    expect(navigate).toHaveBeenCalledWith("/login");
  });

  test("displays error message when registration fails", async () => {
    const register = jest.fn().mockRejectedValue(new Error("Registration failed"));
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "password";

    render(
      <AuthContext.Provider value={{ register }}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: email } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: password } });
    fireEvent.change(screen.getByLabelText("Confirmar Senha"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    await screen.findByText("Erro ao registrar:");

    expect(screen.getByText("Erro ao registrar:")).toBeInTheDocument();
  });
});