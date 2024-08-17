import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';

const HoldingsDistributionChart = ({ holdings }) => {
  const colors = {
    pieColors: [
      'rgba(255, 159, 64, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(255, 205, 86, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(201, 203, 207, 0.7)',
    ],
    pieBorderColors: [
      'rgba(255, 159, 64, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(201, 203, 207, 1)',
    ],
  };

  const pieChartData = {
    labels: holdings.map(asset => asset.assetId),
    datasets: [
      {
        label: 'Holdings',
        data: holdings.map(asset => asset.currentAmount),
        backgroundColor: colors.pieColors.slice(0, holdings.length),
        borderColor: colors.pieBorderColors.slice(0, holdings.length),
        borderWidth: 1
      }
    ]
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ my: 2 }}>
          Holdings Distribution
        </Typography>
        <Pie data={pieChartData} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

export default HoldingsDistributionChart;
