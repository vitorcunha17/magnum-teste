import React, { Suspense, lazy } from 'react';
import UserMenu from '../components/UserMenu';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Grid } from '@mui/material';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage'));
const HistoryPage = lazy(() => import('../pages/HistoryPage'));

const isAuthenticated = () => {
  return localStorage.getItem('token') ? true : false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <UserMenu />
        </Grid>
        <Grid item xs={9}>{children}</Grid>
      </Grid>
    </div>
  ) : (
    <Navigate to='/login' replace />
  );
};

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/transactions'
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/history'
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
