// src/components/Trades.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

import './css/Chart-dashboard.css';

const BASE_URI = process.env.REACT_APP_API_URI;


const Trades = () => {
  const [assets, setAssets] = useState([]);
  const [trades, setTrades] = useState([]);
  const [fundManagers, setFundManagers] = useState([]);
  const [currentHoldings, setCurrentHoldings] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("Buy");
  const [selectedFundManager, setSelectedFundManager] = useState("");
  const [tradeAmount, setTradeAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [fundManagerBalance, setFundManagerBalance] = useState(0);
  const [assetQuantity, setAssetQuantity] = useState(0);

  useEffect(() => {
    axios
      .get(BASE_URI + "/api/assets")
      .then((response) => setAssets(response.data))
      .catch((error) => console.error(error));

    axios
      .get(BASE_URI + "/api/trades")
      .then((response) => {
        // Sort trades in descending order based on tranTime
        const sortedTrades = response.data.sort(
          (a, b) => new Date(b.tranTime) - new Date(a.tranTime)
        );
        setTrades(sortedTrades);
      })
      .catch((error) => console.error(error));

    axios
      .get(BASE_URI + "/api/fundmanagers")
      .then((response) => setFundManagers(response.data))
      .catch((error) => console.error(error));

    axios
      .get(BASE_URI + "/api/assets/current-holdings")
      .then((response) => setCurrentHoldings(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedFundManager) {
      const manager = fundManagers.find(
        (fm) => fm.fundManagerid === selectedFundManager
      );
      if (manager) {
        setFundManagerBalance(manager.currentBalance);
      }
    }
  }, [selectedFundManager, fundManagers]);

  useEffect(() => {
    if (selectedAsset) {
      const holding = currentHoldings.find(
        (a) => a.assetId === selectedAsset.symbol
      );
      setAssetQuantity(holding ? holding.currentQuantity : 0);
    }
  }, [selectedAsset, currentHoldings]);

  const handleAssetChange = (event) => {
    const asset = assets.find((a) => a.symbol === event.target.value);
    setSelectedAsset(asset);
    setCurrentPrice(asset.closingPrice);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    calculateTradeAmount(event.target.value);
  };

  const calculateTradeAmount = (quantity) => {
    if (currentPrice && quantity) {
      const amount = currentPrice * quantity;
      setTradeAmount(amount);
    }
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  const handleFundManagerChange = (event) => {
    setSelectedFundManager(event.target.value);
  };

  const handleOrderSubmit = () => {
    if (!selectedAsset || !quantity || !selectedFundManager) return;

    const existingTrades = trades.filter(
      (trade) =>
        trade.asset.symbol === selectedAsset.symbol && trade.buySell === "B"
    );
    let totalAmount = existingTrades.reduce(
      (total, trade) => total + trade.tradeAmount,
      0
    );
    let totalQuantity = existingTrades.reduce(
      (total, trade) => total + trade.quantity,
      0
    );

    totalAmount += tradeAmount;
    totalQuantity += parseInt(quantity, 10);
    const averagePrice = totalAmount / totalQuantity;

    const orderData = {
      asset: selectedAsset,
      assetPrice: averagePrice,
      quantity: parseInt(quantity, 10),
      tradeAmount,
      buySell: orderType === "Buy" ? "B" : "S",
      tranTime: new Date().toISOString(),
      fundManager: fundManagers.find(
        (fm) => fm.fundManagerid === selectedFundManager
      ),
      tranStatus: "A", // Set tranStatus to 'A' for new trades
    };

    // axios
    //   .post(BASE_URI + "/api/trades", orderData)
    //   .then((response) => {
    //     setTrades([response.data, ...trades]);
    //     resetForm();
    //   })
    //   .catch((error) => console.error(error));
      axios
      .post(BASE_URI + "/api/trades", orderData)
      .then((response) => {
        setTrades([response.data, ...trades]);
        resetForm();

        // Fetch updated fund manager balance
        axios
          .get(BASE_URI + `/api/fundmanagers/${selectedFundManager}`)
          .then((response) => {
            setFundManagerBalance(response.data.currentBalance);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const resetForm = () => {
    setSelectedAsset("");
    setQuantity("");
    setOrderType("Buy");
    setSelectedFundManager("");
    setTradeAmount(0);
    setCurrentPrice(0);
  };

  return (
    <div className="trades">
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Order Booking
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Asset</InputLabel>
          <Select
            value={selectedAsset?.symbol || ""}
            onChange={handleAssetChange}
          >
            {assets.map((asset) => (
              <MenuItem key={asset.symbol} value={asset.symbol}>
                {asset.assetName} ({asset.symbol})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Asset Quantity in Holdings: {assetQuantity}
        </Typography>
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={handleQuantityChange}
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Current Price: {currentPrice}
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Order Type</InputLabel>
          <Select value={orderType} onChange={handleOrderTypeChange}>
            <MenuItem value="Buy">Buy</MenuItem>
            <MenuItem value="Sell">Sell</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Fund Manager</InputLabel>
          <Select
            value={selectedFundManager}
            onChange={handleFundManagerChange}
          >
            {fundManagers.map((fm) => (
              <MenuItem key={fm.fundManagerid} value={fm.fundManagerid}>
                {fm.fundManagerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Trade Amount: {tradeAmount}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Fund Manager Balance: {fundManagerBalance}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
          Submit Order
        </Button>
      </Paper>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Trade History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trades.map((trade) => (
                <TableRow
                  key={trade.tradeId}
                  style={{
                    backgroundColor:
                      trade.buySell === "B" ? "#e8f5e9" : "#ffebee",
                  }}
                >
                  <TableCell>
                    {trade.asset.assetName} ({trade.asset.symbol})
                  </TableCell>
                  <TableCell>{trade.assetPrice.toFixed(2)}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>{trade.tradeAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(trade.tranTime).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </div>
  );
};

export default Trades;
