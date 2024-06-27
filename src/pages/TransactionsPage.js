import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TransactionContext from "../contexts/TransactionContext.js";
import { useNavigate } from "react-router-dom";
import TransactionPassword from "../components/TransactionPassword.js";

const TransactionScreen = () => {
  const navigate = useNavigate();
  const { addTransaction } = useContext(TransactionContext);
  const [transactionType, setTransactionType] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [value, setValue] = useState("");
  const [transferDate, setTransferDate] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    transactionType: "",
    bank: "",
    agency: "",
    account: "",
    pixKey: "",
    value: "",
    transferDate: "",
  });

  const validateForm = () => {
    let tempErrors = {
      transactionType: "",
      bank: "",
      agency: "",
      account: "",
      pixKey: "",
      value: "",
      transferDate: "",
    };
    let isValid = true;

    if (!transactionType) {
      tempErrors.transactionType = "Compo tipo obrigatório";
      isValid = false;
    }
    if (transactionType === "TED") {
      if (!bank) {
        tempErrors.bank = "Compo banco obrigatório";
        isValid = false;
      }
      if (!agency) {
        tempErrors.agency = "Compo agencio obrigatório";
        isValid = false;
      }
      if (!account) {
        tempErrors.account = "Compo conta obrigatório";
        isValid = false;
      }
    }
    if (transactionType === "PIX") {
      if (!pixKey) {
        tempErrors.pixKey = "Compo chave obrigatório";
        isValid = false;
      }
    }
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      tempErrors.value = "Campo valor obrigatório";
      isValid = false;
    }
    if (!transferDate) {
      tempErrors.transferDate = "Campo data obrigatório";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let parsedValue = parseFloat(value);

      const transactionData = {
        transactionType,
        pixKey,
        bank,
        agency,
        account,
        value: parsedValue,
        transferDate,
        description,
        transactionPassword: password,
      };

      addTransaction(transactionData)
        .then(() => {
          navigate("/history");
        })
        .catch((error) => {
          console.error("Erro ao adicionar transação:", error);
        });
    } else {
      alert("Senha incorreta");
    }
  };

  return (
    <Card sx={{ width: "80%" }}>
      <TransactionPassword
        open={open}
        setOpen={setOpen}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <CardContent>
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Registrar Transação
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                value={transactionType}
                label="Tipo"
                onChange={(e) => setTransactionType(e.target.value)}
                required
                error={!!errors.transactionType}
                helperText={errors.transactionType}
              >
                <MenuItem value="TED">TED</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
              </Select>
            </FormControl>
            {transactionType === "TED" && (
              <>
                <TextField
                  label="Banco"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                  error={!!errors.bank}
                  helperText={errors.bank}
                />
                <TextField
                  label="Agência"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                  error={!!errors.agency}
                  helperText={errors.agency}
                />
                <TextField
                  label="Conta"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                  error={!!errors.account}
                  helperText={errors.account}
                />
              </>
            )}
            {transactionType === "PIX" && (
              <TextField
                label="Chave PIX"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                margin="normal"
                fullWidth
                required
                error={!!errors.pixKey}
                helperText={errors.pixKey}
              />
            )}
            <TextField
              label="Valor"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              margin="normal"
              fullWidth
              required
              error={!!errors.value}
              helperText={errors.value}
            />
            <FormControl fullWidth margin="normal">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Data da Transferência"
                  value={transferDate}
                  onChange={(newValue) => {
                    setTransferDate(newValue);
                  }}
                  required
                  error={!!errors.transferDate}
                  helperText={errors.transferDate}
                />
              </LocalizationProvider>
            </FormControl>
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              fullWidth
              multiline
              rows={4}
            />
            <Button
              onClick={() => validateForm() && setOpen(true)}
              variant="contained"
              color="primary"
              fullWidth
            >
              Transferir
            </Button>
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};

export default TransactionScreen;
