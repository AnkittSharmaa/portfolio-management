// src/components/CurrentHoldings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvestedCurrentChart from './InvestedCurrentChart';
import HoldingsDistributionChart from './HoldingsDistributionChart';
import NetValuesTable from './NetValuesTable';

const BASE_URI = process.env.REACT_APP_API_URI;
const CurrentHoldings = () => {
  const [holdings, setHoldings] = useState([]);
  const [netValues, setNetValues] = useState({
    totalInvested: '0.00',
    totalCurrent: '0.00',
    totalProfitLoss: '0.00'
  });

  useEffect(() => {
    axios.get(BASE_URI + '/api/assets/current-holdings')
      .then(response => {
        const updatedHoldings = response.data.map(asset => {
          const minPrice = asset.closingPrice * 0.95;
          const maxPrice = asset.closingPrice * 1.10;
          const currentPrice = Math.random() * (maxPrice - minPrice) + minPrice;
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

        const totalInvested = updatedHoldings.reduce((acc, asset) => acc + asset.investedAmount, 0)?.toFixed(2);
        const totalCurrent = updatedHoldings.reduce((acc, asset) => acc + asset.currentAmount, 0)?.toFixed(2);
        const totalProfitLoss = updatedHoldings.reduce((acc, asset) => acc + asset.profitLoss, 0)?.toFixed(2);

        setNetValues({
          totalInvested,
          totalCurrent,
          totalProfitLoss
        });
      })
      .catch(error => console.error(error));
  }, []);

  const colors = {
    invested: 'rgba(54, 162, 235, 0.7)',
    investedBorder: 'rgba(54, 162, 235, 1)',
    current: 'rgba(255, 99, 132, 0.7)',
    currentBorder: 'rgba(255, 99, 132, 1)',
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
    <div>
      <InvestedCurrentChart barChartData={barChartData} />
      <HoldingsDistributionChart pieChartData={pieChartData} />
      <NetValuesTable netValues={netValues} />
    </div>
  );
};

export default CurrentHoldings;
