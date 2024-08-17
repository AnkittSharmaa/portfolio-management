import React from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const NetValuesTable = ({ netValues }) => {
  // Calculate the net profit/loss percentage
  const netProfitLossPercentage = ((netValues.totalProfitLoss / netValues.totalInvested) * 100).toFixed(2);

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ my: 2 }}>
          Net Values
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell><strong>Invested Amount</strong></TableCell>
                <TableCell><strong>Current Price</strong></TableCell>
                <TableCell><strong>Total Profit or Loss</strong></TableCell>
                <TableCell><strong>Net Profit/Loss %</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><strong>Net Total</strong></TableCell>
                <TableCell>{netValues.totalInvested}</TableCell>
                <TableCell>{netValues.totalCurrent}</TableCell>
                <TableCell style={{ color: netValues.totalProfitLoss < 0 ? 'red' : 'green' }}>
                  {netValues.totalProfitLoss}
                </TableCell>
                <TableCell style={{ color: netValues.totalProfitLoss < 0 ? 'red' : 'green' }}>
                  {netProfitLossPercentage}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default NetValuesTable;
