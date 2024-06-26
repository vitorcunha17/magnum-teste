import React, { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/transfers");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    setLoading(true);

    try {
      const response = await api.post("/transfer", transaction);
      setTransactions([...transactions, response.data]);
      alert("Transação realizada com sucesso!");
    } catch (error) {
      alert("Erro ao realizar a transação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, loading }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
