// src/components/NetWorthChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';

import './css/Chart-dashboard.css';

const BASE_URI = process.env.REACT_APP_API_URI;
const NetWorthChart = () => {
  const [netWorthData, setNetWorthData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URI + '/api/net-worth')
      .then(response => setNetWorthData(response.data))
      .catch(error => console.error(error));
  }, []);

  const data = {
    labels: netWorthData.map(item => item.txnDate),
    datasets: [
      {
        label: 'Net Worth',
        data: netWorthData.map(item => item.netWorth),
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="networth-chart">
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Net Worth Over Time
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
    </div>
  );
};

export default NetWorthChart;
