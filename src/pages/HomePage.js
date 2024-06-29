import React, { useEffect, useContext, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import UserContext from "../contexts/UserContext.js";
import TransactionContext from "../contexts/TransactionContext.js";
import HistoryPage from "./HistoryPage.js";

const HomePage = () => {
  const { fetchBalance, fetchUser } = useContext(UserContext);
  const { addDeposit } = useContext(TransactionContext);
  const [balance, setBalance] = useState();
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [depositValue, setDepositValue] = useState();
  const [errors, setErrors] = useState({
    depositValue: "",
  });

  useEffect(() => {
    fetchBalance().then((data) => setBalance(data?.saldo));
    fetchUser().then((data) => setEmail(data?.email));
    // eslint-disable-next-line
  }, [balance]);

  const validateForm = () => {
    let tempErrors = { depositValue: "" };
    let isValid = true;

    if (!depositValue) {
      tempErrors.depositValue = "Valor obrigatório";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addDeposit({ value: depositValue})
        .then(() => {
          fetchBalance().then((data) => setBalance(data?.saldo));
          setOpen(false);
        })
        .catch((error) => {
          console.error("Erro ao depositar:", error);
        });
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Card sx={{ width: 500, height: 150 }}>
            <CardContent>
              <br />
              <Typography component="h1" variant="h5" align="center">
                Bem-vindo!
                <br />
                {email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card sx={{ width: 500, height: 150 }}>
            <CardContent>
              <Typography
                align="center"
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Seu saldo é de:
              </Typography>
              <Typography align="center" variant="h3" component="div">
                R${balance}
              </Typography>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Depositar
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <HistoryPage resume={true} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Faça seu depósito</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="depositValue"
            name="depositValue"
            label="Valor do depósito"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDepositValue(e.target.value)}
            error={!!errors.depositValue}
            helperText={errors.depositValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
