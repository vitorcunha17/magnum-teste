import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionContext } from "../contexts/TransactionContext";
import { MemoryRouter } from "react-router-dom";
import TransactionScreen from "../pages/TransactionScreen";

describe("TransactionScreen", () => {
  test("renders transaction form", () => {
    render(
      <TransactionContext.Provider value={{ addTransaction: jest.fn() }}>
        <MemoryRouter>
          <TransactionScreen />
        </MemoryRouter>
      </TransactionContext.Provider>
    );

    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Transferir" })).toBeInTheDocument();
  });

  test("displays error messages for empty fields", () => {
    render(
      <TransactionContext.Provider value={{ addTransaction: jest.fn() }}>
        <MemoryRouter>
          <TransactionScreen />
        </MemoryRouter>
      </TransactionContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Transferir" }));

    expect(screen.getByText("Campo tipo obrigatório")).toBeInTheDocument();
    expect(screen.queryByText("Campo banco obrigatório")).toBeNull();
    expect(screen.queryByText("Campo agência obrigatório")).toBeNull();
    expect(screen.queryByText("Campo conta obrigatório")).toBeNull();
    expect(screen.queryByText("Campo chave obrigatório")).toBeNull();
    expect(screen.getByText("Campo valor obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Campo data obrigatório")).toBeInTheDocument();
  });

  test("calls addTransaction function with correct arguments when form is submitted", () => {
    const addTransaction = jest.fn().mockResolvedValue();
    const transactionType = "TED";
    const bank = "Bank";
    const agency = "Agency";
    const account = "Account";
    const pixKey = "";
    const value = "100";
    const transferDate = new Date();
    const description = "Transaction description";
    const password = "password";

    render(
      <TransactionContext.Provider value={{ addTransaction }}>
        <MemoryRouter>
          <TransactionScreen />
        </MemoryRouter>
      </TransactionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Tipo"), { target: { value: transactionType } });
    fireEvent.change(screen.getByLabelText("Banco"), { target: { value: bank } });
    fireEvent.change(screen.getByLabelText("Agência"), { target: { value: agency } });
    fireEvent.change(screen.getByLabelText("Conta"), { target: { value: account } });
    fireEvent.change(screen.getByLabelText("Valor"), { target: { value } });
    fireEvent.change(screen.getByLabelText("Data da Transferência"), { target: { value: transferDate } });
    fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: description } });
    fireEvent.click(screen.getByRole("button", { name: "Transferir" }));

    expect(addTransaction).toHaveBeenCalledWith({
      transactionType,
      bank,
      agency,
      account,
      pixKey,
      value: parseFloat(value),
      transferDate,
      description,
      transactionPassword: password,
    });
  });

  test("navigates to history page after successful transaction", async () => {
    const addTransaction = jest.fn().mockResolvedValue();
    const navigate = jest.fn();
    const transactionType = "TED";
    const bank = "Bank";
    const agency = "Agency";
    const account = "Account";
    const pixKey = "";
    const value = "100";
    const transferDate = new Date();
    const description = "Transaction description";
    const password = "password";

    render(
      <TransactionContext.Provider value={{ addTransaction }}>
        <MemoryRouter>
          <TransactionScreen />
        </MemoryRouter>
      </TransactionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Tipo"), { target: { value: transactionType } });
    fireEvent.change(screen.getByLabelText("Banco"), { target: { value: bank } });
    fireEvent.change(screen.getByLabelText("Agência"), { target: { value: agency } });
    fireEvent.change(screen.getByLabelText("Conta"), { target: { value: account } });
    fireEvent.change(screen.getByLabelText("Valor"), { target: { value } });
    fireEvent.change(screen.getByLabelText("Data da Transferência"), { target: { value: transferDate } });
    fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: description } });
    fireEvent.click(screen.getByRole("button", { name: "Transferir" }));

    await screen.findByText("Registrar Transação");

    expect(navigate).toHaveBeenCalledWith("/history");
  });

  test("displays error message when transaction fails", async () => {
    const addTransaction = jest.fn().mockRejectedValue(new Error("Transaction failed"));
    const transactionType = "TED";
    const bank = "Bank";
    const agency = "Agency";
    const account = "Account";
    const pixKey = "";
    const value = "100";
    const transferDate = new Date();
    const description = "Transaction description";
    const password = "password";

    render(
      <TransactionContext.Provider value={{ addTransaction }}>
        <MemoryRouter>
          <TransactionScreen />
        </MemoryRouter>
      </TransactionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Tipo"), { target: { value: transactionType } });
    fireEvent.change(screen.getByLabelText("Banco"), { target: { value: bank } });
    fireEvent.change(screen.getByLabelText("Agência"), { target: { value: agency } });
    fireEvent.change(screen.getByLabelText("Conta"), { target: { value: account } });
    fireEvent.change(screen.getByLabelText("Valor"), { target: { value } });
    fireEvent.change(screen.getByLabelText("Data da Transferência"), { target: { value: transferDate } });
    fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: description } });
    fireEvent.click(screen.getByRole("button", { name: "Transferir" }));

    await screen.findByText("Erro ao adicionar transação:");

    expect(screen.getByText("Erro ao adicionar transação:")).toBeInTheDocument();
  });
});