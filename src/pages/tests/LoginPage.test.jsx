import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import LoginPage from "../LoginPage";
import AuthContext from "../../contexts/AuthContext";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LoginPage", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should allow a user to login", async () => {
    const { getByLabelText, getByRole, findByText } = render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    fireEvent.change(getByLabelText(/email address/i), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(getByRole("button", { name: /login/i }));

    await findByText(/Falha ao fazer login/i);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith("vitor@gamil.com", "teste")
    );
    expect(mockedNavigate).toHaveBeenCalledWith("/home");
  });

  test("should show an error message for invalid login", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByLabelText, getByRole, findByText } = render(
      <AuthContext.Provider value={{ login: mockLogin, basename: "/login" }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    fireEvent.change(getByLabelText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(getByRole("button", { name: /login/i }));

    const errorMessage = await findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
