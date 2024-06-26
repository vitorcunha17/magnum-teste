import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body2" align="center">
              {"Não tem uma conta? Registre-se aqui"}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
