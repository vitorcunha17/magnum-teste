import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionContext } from "../../contexts/TransactionContext";
import HistoryPage from "../HistoryPage";

describe("HistoryPage", () => {
  test("renders loading message when loading is true", () => {
    render(
      <TransactionContext.Provider value={{ loading: true }}>
        <HistoryPage />
      </TransactionContext.Provider>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  test("renders history table with transactions", () => {
    const transactions = [
      {
        _id: "1",
        transactionType: "TED",
        bank: "Bank A",
        agency: "1234",
        account: "5678",
        pixKey: "-",
        value: { $numberDecimal: "100.00" },
        transferDate: "2022-01-01",
        description: "Transaction 1",
      },
      {
        _id: "2",
        transactionType: "PIX",
        bank: "-",
        agency: "-",
        account: "-",
        pixKey: "1234567890",
        value: { $numberDecimal: "50.00" },
        transferDate: "2022-01-02",
        description: "Transaction 2",
      },
    ];

    render(
      <TransactionContext.Provider value={{ transactions }}>
        <HistoryPage />
      </TransactionContext.Provider>
    );

    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Banco (TED)")).toBeInTheDocument();
    expect(screen.getByText("Agência (TED)")).toBeInTheDocument();
    expect(screen.getByText("Conta (TED)")).toBeInTheDocument();
    expect(screen.getByText("Chave (PIX)")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
    expect(screen.getByText("Data Transferência")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();

    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.getByText("Bank A")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
    expect(screen.getByText("5678")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
    expect(screen.getByText("01/01/2022")).toBeInTheDocument();
    expect(screen.getByText("Transaction 1")).toBeInTheDocument();

    expect(screen.getByText("PIX")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("50.00")).toBeInTheDocument();
    expect(screen.getByText("02/01/2022")).toBeInTheDocument();
    expect(screen.getByText("Transaction 2")).toBeInTheDocument();
  });

  test("applies filters correctly", () => {
    const transactions = [
      {
        _id: "1",
        transactionType: "TED",
        bank: "Bank A",
        agency: "1234",
        account: "5678",
        pixKey: "-",
        value: { $numberDecimal: "100.00" },
        transferDate: "2022-01-01",
        description: "Transaction 1",
      },
      {
        _id: "2",
        transactionType: "PIX",
        bank: "-",
        agency: "-",
        account: "-",
        pixKey: "1234567890",
        value: { $numberDecimal: "50.00" },
        transferDate: "2022-01-02",
        description: "Transaction 2",
      },
    ];

    render(
      <TransactionContext.Provider value={{ transactions }}>
        <HistoryPage />
      </TransactionContext.Provider>
    );

    // Apply type filter
    fireEvent.change(screen.getByLabelText("Tipo"), {
      target: { value: "TED" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.queryByText("PIX")).not.toBeInTheDocument();

    // Apply period filter
    fireEvent.change(screen.getByLabelText("Período"), {
      target: { value: "7" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.queryByText("PIX")).not.toBeInTheDocument();

    // Apply start date filter
    fireEvent.change(screen.getByLabelText("Data Inicial"), {
      target: { value: "01/01/2022" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.queryByText("PIX")).not.toBeInTheDocument();

    // Apply end date filter
    fireEvent.change(screen.getByLabelText("Data Final"), {
      target: { value: "01/02/2022" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.getByText("PIX")).toBeInTheDocument();

    // Apply value filters
    fireEvent.change(screen.getByLabelText("Valor Inicial"), {
      target: { value: "75.00" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.getByText("PIX")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Valor Final"), {
      target: { value: "100.00" },
    });
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.queryByText("PIX")).not.toBeInTheDocument();
  });

  test("clears filters correctly", () => {
    const transactions = [
      {
        _id: "1",
        transactionType: "TED",
        bank: "Bank A",
        agency: "1234",
        account: "5678",
        pixKey: "-",
        value: { $numberDecimal: "100.00" },
        transferDate: "2022-01-01",
        description: "Transaction 1",
      },
      {
        _id: "2",
        transactionType: "PIX",
        bank: "-",
        agency: "-",
        account: "-",
        pixKey: "1234567890",
        value: { $numberDecimal: "50.00" },
        transferDate: "2022-01-02",
        description: "Transaction 2",
      },
    ];

    render(
      <TransactionContext.Provider value={{ transactions }}>
        <HistoryPage />
      </TransactionContext.Provider>
    );

    // Apply filters
    fireEvent.change(screen.getByLabelText("Tipo"), {
      target: { value: "TED" },
    });
    fireEvent.change(screen.getByLabelText("Período"), {
      target: { value: "7" },
    });
    fireEvent.change(screen.getByLabelText("Data Inicial"), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(screen.getByLabelText("Data Final"), {
      target: { value: "01/02/2022" },
    });
    fireEvent.change(screen.getByLabelText("Valor Inicial"), {
      target: { value: "75.00" },
    });
    fireEvent.change(screen.getByLabelText("Valor Final"), {
      target: { value: "100.00" },
    });

    // Clear filters
    fireEvent.click(screen.getByText("Limpar Filtros"));

    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.getByText("PIX")).toBeInTheDocument();
  });
});