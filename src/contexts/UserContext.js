import React, { createContext, useState } from "react";
import api from "../services/api.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTransactionPassword = async (transactionPassword, confirmPassword) => {
    const token = localStorage.getItem("token");

    if (transactionPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return Promise.reject(new Error("As senhas não coincidem!"));
    }
    try {
      const response = await api.post(
        "/transaction-password",
        { transactionPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Falha ao registrar");
      }
      alert("Senha de transação cadastrada com sucesso!");
    } catch (error) {
      alert(error.message);
      return Promise.reject(new Error("Falha ao registrar"));
    }
  };

  return (
    <UserContext.Provider
      value={{ fetchBalance, fetchUser, addTransactionPassword, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
