import React from "react";
import App from "./App.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { TransactionProvider } from "./contexts/TransactionContext.js";
import { UserProvider } from "./contexts/UserContext.js";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TransactionProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </TransactionProvider>
  </AuthProvider>
);
