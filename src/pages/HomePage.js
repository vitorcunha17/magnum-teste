import React, { useEffect, useContext, useState } from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import UserContext from "../contexts/UserContext.js";
import HistoryPage from "./HistoryPage.js";

const HomePage = () => {
  const { fetchBalance, fetchUser } = useContext(UserContext);
  const [balance, setBalance] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    fetchBalance().then((data) => setBalance(data?.saldo));
    fetchUser().then((data) => setEmail(data?.email));
    // eslint-disable-next-line
  }, [balance]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Typography component="h1" variant="h5" align="center">
            Bem-vindo!
            <br />
            {email}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card sx={{ width: 400 }}>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <HistoryPage />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
