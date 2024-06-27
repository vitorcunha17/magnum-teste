import React, { Suspense, lazy } from "react";
import UserMenu from "../components/UserMenu.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Grid } from "@mui/material";

const LoginPage = lazy(() => import("../pages/LoginPage.js"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.js"));
const HomePage = lazy(() => import("../pages/HomePage.js"));
const TransactionsPage = lazy(() => import("../pages/TransactionsPage.js"));
const HistoryPage = lazy(() => import("../pages/HistoryPage.js"));
const ProfilePage = lazy(() => import("../pages/ProfilePage.js"));

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <Grid container columns={16} spacing={1}>
      <Grid item xs={3}>
        <UserMenu />
      </Grid>
      <Grid item xs={13}>
        <center>{children}</center>
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
