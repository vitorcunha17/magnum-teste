import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TransactionContext from "../contexts/TransactionContext.js";

const HistoryPage = () => {
  const { transactions, fetchTransactions, loading } =
    useContext(TransactionContext);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [
    transactions,
    typeFilter,
    periodFilter,
    startDate,
    endDate,
    startValue,
    endValue,
  ]);

  const applyFilters = () => {
    let result = transactions.filter((transaction) => {
      // Filtro por tipo
      if (
        typeFilter &&
        (!transaction.transactionType ||
          !transaction.transactionType
            .toLowerCase()
            .includes(typeFilter.toLowerCase()))
      )
        return false;

      // Filtro por valor
      if (
        (startValue && transaction?.value?.$numberDecimal < startValue) ||
        (endValue && transaction?.value?.$numberDecimal > endValue)
      )
        return false;

      // Filtro por data
      const transactionDate = new Date(transaction.transferDate);
      if (
        (startDate && transactionDate < startDate) ||
        (endDate && transactionDate > endDate)
      )
        return false;

      return true;
    });

    // Filtro por período
    if (periodFilter) {
      console.log("periodFilter", periodFilter);
      const endDate = new Date();
      let startDate = new Date();
      switch (periodFilter) {
        case "7":
          startDate.setDate(endDate.getDate() - 7);
          break;
        case "15":
          startDate.setDate(endDate.getDate() - 15);
          break;
        case "30":
          startDate.setDate(endDate.getDate() - 30);
          break;
        case "90":
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          break;
      }
      result = result.filter((transaction) => {
        const transactionDate = new Date(transaction.transferDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    setFilteredTransactions(result);
  };

  const formatDate = (dateString) => {
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("pt-BR", optionsDate);
    return formattedDate;
  };

  const clearFilters = () => {
    setTypeFilter("");
    setPeriodFilter("");
    setStartDate(null);
    setEndDate(null);
    setStartValue("");
    setEndValue("");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Histórico de Transações
      </Typography>
      <FormControl fullWidth margin="normal">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "15%" },
          }}
          autoComplete="off"
        >
          <TextField
            label="Tipo"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            fullWidth
          ></TextField>
          <TextField
            select
            label="Período"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="7">7 Dias</MenuItem>
            <MenuItem value="15">15 Dias</MenuItem>
            <MenuItem value="30">30 Dias</MenuItem>
            <MenuItem value="90">90 Dias</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data Inicial"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Data Final"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="Valor Inicial"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
            fullWidth
          />
          <TextField
            label="Valor Final"
            value={endValue}
            onChange={(e) => setEndValue(e.target.value)}
            fullWidth
          />
          <Button onClick={clearFilters}>Limpar Filtros</Button>
        </Box>
      </FormControl>
      {/* Renderização da tabela com `filteredTransactions` */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Banco (TED)</TableCell>
              <TableCell>Agência (TED)</TableCell>
              <TableCell>Conta (TED)</TableCell>
              <TableCell>Chave (PIX)</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data Transferência</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.transactionType}</TableCell>
                {/* Exemplo: TED ou PIX */}
                <TableCell>
                  {transaction.transactionType === "TED"
                    ? transaction.bank
                    : ""}
                </TableCell>
                <TableCell>
                  {transaction.transactionType === "TED"
                    ? transaction.agency
                    : ""}
                </TableCell>
                <TableCell>
                  {transaction.transactionType === "TED"
                    ? transaction.account
                    : ""}
                </TableCell>
                <TableCell>
                  {transaction.transactionType === "PIX"
                    ? transaction.pixKey
                    : ""}
                </TableCell>
                <TableCell>{transaction?.value?.$numberDecimal}</TableCell>
                <TableCell>{formatDate(transaction.transferDate)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default HistoryPage;
