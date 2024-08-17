// src/components/AssetDistribution.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography, Box } from '@mui/material';
// import css
import './css/Chart-dashboard.css';

const BASE_URI = process.env.REACT_APP_API_URI;
const AssetDistribution = () => {
  const [assets, setAssets] = useState([]);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get(BASE_URI + '/api/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error(error));

    axios.get(BASE_URI + '/api/assets/current-holdings')
      .then(response => setHoldings(response.data))
      .catch(error => console.error(error));
  }, []);

  const distributionData = holdings.reduce((acc, asset) => {
    const assetDetail = assets.find(a => a.symbol === asset.assetId);
    if (assetDetail) {
      if (!acc[assetDetail.assetType]) {
        acc[assetDetail.assetType] = 0;
      }
      acc[assetDetail.assetType] += asset.totalValue;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(distributionData),
    datasets: [
      {
        data: Object.values(distributionData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="asset-distribution">
    <Card sx={{ my: 8 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Asset Distribution
        </Typography>
        <Box display="flex" justifyContent="space-around">
          <Pie data={data} />
        </Box>
      </CardContent>
    </Card>
    </div>
  );
};

export default AssetDistribution;
