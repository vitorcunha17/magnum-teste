import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TransactionContext from '../contexts/TransactionContext';

const TransactionScreen = () => {
  const { addTransaction } = useContext(TransactionContext);
  const [transactionType, setTransactionType] = useState('');
  const [bank, setBank] = useState('');
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [value, setValue] = useState();
  const [transferDate, setTransferDate] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    const transactionData = {
      transactionType,
      pixKey,
      bank,
      agency,
      account,
      value,
      transferDate,
      description,
    };
    e.preventDefault();
    await addTransaction(transactionData);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Registrar Transação
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <InputLabel>Tipo</InputLabel>
          <Select
            value={transactionType}
            label='Tipo'
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <MenuItem value='TED'>TED</MenuItem>
            <MenuItem value='PIX'>PIX</MenuItem>
          </Select>
        </FormControl>
        {transactionType === 'TED' && (
          <>
            <TextField
              label='Banco'
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              margin='normal'
              fullWidth
              required
            />
            <TextField
              label='Agência'
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              margin='normal'
              fullWidth
              required
            />
            <TextField
              label='Conta'
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              margin='normal'
              fullWidth
              required
            />
          </>
        )}
        {transactionType === 'PIX' && (
          <TextField
            label='Chave PIX'
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            margin='normal'
            fullWidth
            required
          />
        )}
        <TextField
          label='Valor'
          value={parseFloat(value)}
          onChange={(e) => setValue(e.target.value)}
          margin='normal'
          fullWidth
          type='number'
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Data da Transferência'
            value={transferDate}
            onChange={(newValue) => {
              setTransferDate(newValue);
            }}
            required
          />
        </LocalizationProvider>

        <TextField
          label='Descrição'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin='normal'
          fullWidth
          multiline
          rows={4}
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Transferir
        </Button>
      </form>
    </Container>
  );
};

export default TransactionScreen;
