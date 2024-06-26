import React, { createContext, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      alert("Falha ao fazer login");
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      api.defaults.headers.Authorization = undefined;
      setUser(null);
    } catch (error) {
      alert("Erro ao fazer logout:", error);
    }
  };

  const register = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return Promise.reject(new Error("As senhas não coincidem!"));
    }
    try {
      const response = await api.post("/register", { email, password });
      if (response.status !== 200) {
        throw new Error("Falha ao registrar");
      }
      alert("Registro bem-sucedido!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
