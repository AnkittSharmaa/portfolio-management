// src/components/CashFlowChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import "chart.js/auto";

import './css/Chart-dashboard.css';

const BASE_URI = process.env.REACT_APP_API_URI;

const CashFlowChart = () => {
  const [cashFlowData, setCashFlowData] = useState([]);

  // useEffect(() => {
  //   axios.get('${BASE_URI}/api/cash-flow')
    
  //     .then(response => setCashFlowData(response.data))
  //     .catch(error => console.error(error));
  // }, []);
  useEffect(() => {
    axios.get(BASE_URI + '/api/cash-flow')
      .then(response => {
        console.log(response.data); // Log data to ensure it's being fetched
        setCashFlowData(response.data);
      })
      .catch(error => console.error(error));
  }, []);
  

  // const data = {
  //   labels: cashFlowData.map(item => item.label),
  //   datasets: [
  //     {
  //       data: cashFlowData.map(item => item.value),
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
  //     },
  //   ],
  // };
  const data = {
    labels: cashFlowData.map(item => item.label),
    datasets: [
      {
        data: cashFlowData.map(item => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  

  return (
    <div className="cashflow-chart">
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Cash Flow
        </Typography>
        <Pie data={data} />
      </CardContent>
    </Card>
    </div>
  );
};

export default CashFlowChart;
