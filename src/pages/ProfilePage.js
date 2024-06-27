import React, { useEffect, useContext, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UserContext from "../contexts/UserContext.js";

const HomePage = () => {
  const { fetchUser, addTransactionPassword } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addTransactionPassword(password, confirmPassword)
        .then(() => {
          handleClose();
        })
        .catch((error) => {
          console.error("Erro ao registrar:", error);
        });
    }
  };

  const validateForm = () => {
    let tempErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (!password) {
      tempErrors.password = "Senha obrigatória";
      isValid = false;
    }
    if (!confirmPassword) {
      tempErrors.confirmPassword = "Confirmar senha obrigatório";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUser().then((data) => setEmail(data?.email));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <Card sx={{ width: "50%" }}>
            <CardContent>
              <Avatar sx={{ width: 106, height: 106 }} />
              <br />
              <Typography align="center" variant="h4" component="div">
                {email}
              </Typography>
              <br />
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="primary"
              >
                Cadastrar senha de transação
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre sua senha de transação</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Senha de transação"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar senha de transação"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
