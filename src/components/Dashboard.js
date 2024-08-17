import React, { useEffect, useState } from "react";
import { Box, Container, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import InvestedVsCurrentChart from "./InvestedCurrentChart";
import HoldingsDistributionChart from "./HoldingsDistributionChart";
import NetValuesTable from "./NetValuesTable";
import CashFlowChart from "./CashFlowChart";
import NetWorthChart from "./NetWorthChart";
import AssetDistribution from "./AssetDistribution";
import "chart.js/auto";
import "boxicons";
import "../App.css"; // Ensure this path is correct
import "./css/Chart-dashboard.css";
const BASE_URI = process.env.REACT_APP_API_URI;
const Dashboard = () => {
  const [holdings, setHoldings] = useState([]);
  const [netValues, setNetValues] = useState({
    totalInvested: "0.00",
    totalCurrent: "0.00",
    totalProfitLoss: "0.00",
  });

  useEffect(() => {
    axios
      .get(BASE_URI + "/api/assets/current-holdings")
      .then((response) => {
        const updatedHoldings = response.data.map((asset) => {
          const minPrice = asset.closingPrice * 0.95;
          const maxPrice = asset.closingPrice * 1.1;
          const currentPrice = Math.random() * (maxPrice - minPrice) + minPrice; // Random price between min and max
          const currentAmount = currentPrice * asset.currentQuantity;
          const investedAmount = asset.closingPrice * asset.currentQuantity;
          const profitLoss = currentAmount - investedAmount;

          return {
            ...asset,
            currentPrice,
            currentAmount,
            investedAmount,
            profitLoss,
          };
        });
        setHoldings(updatedHoldings);

        const totalInvested = updatedHoldings
          .reduce((acc, asset) => acc + asset.investedAmount, 0)
          .toFixed(2);
        const totalCurrent = updatedHoldings
          .reduce((acc, asset) => acc + asset.currentAmount, 0)
          .toFixed(2);
        const totalProfitLoss = updatedHoldings
          .reduce((acc, asset) => acc + asset.profitLoss, 0)
          .toFixed(2);

        setNetValues({
          totalInvested,
          totalCurrent,
          totalProfitLoss,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" height="100%">
              <NetValuesTable netValues={netValues} />
              <InvestedVsCurrentChart holdings={holdings} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" height="100%">
              <HoldingsDistributionChart holdings={holdings} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <CashFlowChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <NetWorthChart />
                {/* <a href="/">
                  <img
                    src="https://i.ibb.co/GQ5TmBC/Screenshot-2024-08-16-105130.png"
                    alt="Screenshot-2024-08-16-105130"
                    border="0"
                  />
                </a> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <AssetDistribution />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
