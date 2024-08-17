import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MyAssets = ({ onNetValuesUpdate }) => {
  const [holdings, setHoldings] = useState([]);
  const [netValues, setNetValues] = useState({
    totalInvested: '0.00',
    totalCurrent: '0.00',
    totalProfitLoss: '0.00',
    netProfitLossPercentage: '0.00',
  });

  const BASE_URI = process.env.REACT_APP_API_URI;
  useEffect(() => {
    axios.get(BASE_URI + "/api/assets/current-holdings")
      .then(response => {
        const updatedHoldings = response.data.map(asset => {
          const minPrice = asset.closingPrice * 0.96; 
          const maxPrice = asset.closingPrice * 1.20;
          const currentPrice = Math.random() * (maxPrice - minPrice) + minPrice; 
          const currentAmount = currentPrice * asset.currentQuantity;
          const investedAmount = asset.closingPrice * asset.currentQuantity;
          const profitLoss = currentAmount - investedAmount;
          const profitLossPercentage = ((profitLoss / investedAmount) * 100).toFixed(2);

          return {
            ...asset,
            currentPrice,
            currentAmount,
            investedAmount,
            profitLoss,
            profitLossPercentage,
          };
        });
        setHoldings(updatedHoldings);

        // Calculate net values
        const totalInvested = updatedHoldings.reduce((acc, asset) => acc + asset.investedAmount, 0).toFixed(2);
        const totalCurrent = updatedHoldings.reduce((acc, asset) => acc + asset.currentAmount, 0).toFixed(2);
        const totalProfitLoss = updatedHoldings.reduce((acc, asset) => acc + asset.profitLoss, 0).toFixed(2);
        const netProfitLossPercentage = ((totalProfitLoss / totalInvested) * 100).toFixed(2);

        // Set net values state and pass them to parent
        setNetValues({
          totalInvested,
          totalCurrent,
          totalProfitLoss,
          netProfitLossPercentage,
        });
        onNetValuesUpdate({
          totalInvested,
          totalCurrent,
          totalProfitLoss,
          netProfitLossPercentage,
        });
      })
      .catch(error => console.error(error));
  }, [BASE_URI, onNetValuesUpdate]);

  return (
    <div className="my-assets">
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Current Holdings
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Symbol</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Buying Price</TableCell>
                <TableCell>Invested Amount</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Total Profit or Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.currentQuantity}</TableCell>
                  <TableCell>{asset.closingPrice.toFixed(2)}</TableCell>
                  <TableCell>{asset.investedAmount.toFixed(2)}</TableCell>
                  <TableCell>{asset.currentPrice.toFixed(2)}</TableCell>
                  <TableCell style={{ color: asset.profitLoss < 0 ? 'red' : 'green' }}>
                    {asset.profitLoss.toFixed(2)} ({asset.profitLossPercentage}%)
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}><strong>Net Total</strong></TableCell>
                <TableCell>{netValues.totalInvested}</TableCell>
                <TableCell>{netValues.totalCurrent}</TableCell>
                <TableCell style={{ color: netValues.totalProfitLoss < 0 ? 'red' : 'green' }}>
                  {netValues.totalProfitLoss} ({netValues.netProfitLossPercentage}%)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
    </div>
  );
};

export default MyAssets;
