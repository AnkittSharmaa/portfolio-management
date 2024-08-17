// src/components/EquityWealthDistribution.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardContent, Typography } from '@mui/material';

import './PieChart.css';

const BASE_URI = process.env.REACT_APP_API_URI;
const EquityWealthDistribution = () => {
  const [equityData, setEquityData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URI + '/api/net-worth')
      .then(response => setEquityData(response.data))
      .catch(error => console.error(error));
  }, []);

  const data = {
    labels: equityData.map(item => item.symbol),
    datasets: [
      {
        data: equityData.map(item => item.currentAmount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className='equity-wealth-distribution'>
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Equity Wealth Distribution
        </Typography>
        <Pie data={data} />
      </CardContent>
    </Card>
    </div>
  );
};

export default EquityWealthDistribution;
