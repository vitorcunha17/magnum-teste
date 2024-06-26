import React, { createContext, useState } from "react";
import api from "../services/api.js";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/transfers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (isNaN(transaction.value) || transaction.value <= 0) {
        alert("Valor inválido!");
        return Promise.reject(new Error("Valor inválido!"));
      }
      const response = await api.post("/transfer", transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions([...transactions, response.data]);
      alert("Transação realizada com sucesso!");
    } catch (error) {
      alert("Erro ao realizar a transação.");
      return Promise.reject(new Error("Erro ao realizar a transação."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, fetchTransactions, loading }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
