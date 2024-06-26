import React, { useContext } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TransactionContext from "../contexts/TransactionContext.js";

const HistoryPage = () => {
  const { transactions, loading } = useContext(TransactionContext);
  console.log(loading);
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
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
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transactionType}</TableCell>{" "}
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
                <TableCell>{transaction.value}</TableCell>
                <TableCell>{transaction.transferDate}</TableCell>
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
