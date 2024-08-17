import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';

const InvestedVsCurrentChart = ({ holdings }) => {
  const colors = {
    invested: 'rgba(54, 162, 235, 0.7)',
    investedBorder: 'rgba(54, 162, 235, 1)',
    current: 'rgba(255, 99, 132, 0.7)',
    currentBorder: 'rgba(255, 99, 132, 1)',
  };

  const barChartData = {
    labels: holdings.map(asset => asset.assetId),
    datasets: [
      {
        label: 'Invested Amount',
        data: holdings.map(asset => asset.investedAmount),
        backgroundColor: colors.invested,
        borderColor: colors.investedBorder,
        borderWidth: 1
      },
      {
        label: 'Current Amount',
        data: holdings.map(asset => asset.currentAmount),
        backgroundColor: colors.current,
        borderColor: colors.currentBorder,
        borderWidth: 1
      }
    ]
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ my: 2 }}>
          Invested vs Current Amount
        </Typography>
        <Bar data={barChartData} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

export default InvestedVsCurrentChart;
