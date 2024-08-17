import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import './css/fundmanagement.css';

const FundManagement = () => {
  const [fundManagers, setFundManagers] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [selectedFundManagerId, setSelectedFundManagerId] = useState('');
  const [selectedFundManagerName, setSelectedFundManagerName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [funds, setFunds] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const BASE_URI = process.env.REACT_APP_API_URI;

  useEffect(() => {
    async function fetchFundManagers() {
      const response = await fetch(BASE_URI + '/api/fundmanagers');
      const data = await response.json();
      setFundManagers(data);
    }
    fetchFundManagers();

    async function fetchFunds() {
      const response = await fetch(BASE_URI + '/api/funds');
      const data = await response.json();
      setFunds(data);
    }
    fetchFunds();
  }, [BASE_URI]);

  const addTransaction = async (payload) => {
    try {
      const response = await fetch(BASE_URI + '/api/funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { id } = await response.json();
      return id;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const handleFundManagerSelection = (event) => {
    const name = event.target.value;
    setSelectedFundManagerName(name);

    const selectedManager = fundManagers.find(manager => manager.fundManagerName === name);
    if (selectedManager) {
      setSelectedFundManagerId(selectedManager.fundManagerid);
      setCurrentBalance(selectedManager.currentBalance);
    } else {
      setSelectedFundManagerId('');
      setCurrentBalance('');
    }
  };

  const handleAddTransaction = async () => {
    if (transactionType === 'debit' && parseFloat(amount) > currentBalance) {
      alert('Error: Debit amount exceeds current balance. Please re-enter the information.');
      return;
    }

    let tranType = '';
    let sign = 1;
    if (transactionType === 'credit') {
      tranType = 'c';
      sign = 1;
    } else if (transactionType === 'debit') {
      tranType = 'd';
      sign = -1;
    }

    let newBalance = currentBalance + sign * parseInt(amount);

    const transactionData = {
      tranType,
      amount: parseInt(amount),
      tranTime: transactionTime,
      fundManagerId: selectedFundManagerId,
      fundAccBalance: newBalance,
      bankAccNo: bankAccountNo,
    };

    try {
      await addTransaction(transactionData);
      setConfirmationMessage(`Transaction ${tranType === 'c' ? 'credited' : 'debited'} successfully.`);
    } catch {
      setConfirmationMessage('Transaction failed. Please try again.');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="fixed-left">
        <Card>
          <CardContent>
            <Typography variant="h6">Add Fund Transaction</Typography>
            <form className="fund-transaction-form">
              <div className="form-group">
                <label htmlFor="transactionType">Transaction Type</label>
                <select
                  id="transactionType"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="transactionTime">Transaction Time</label>
                <input
                  type="date"
                  id="transactionTime"
                  value={transactionTime}
                  onChange={(e) => setTransactionTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bankAccountNo">Bank Account No</label>
                <input
                  type="text"
                  id="bankAccountNo"
                  value={bankAccountNo}
                  onChange={(e) => setBankAccountNo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fundManager">Fund Manager</label>
                <select
                  id="fundManager"
                  value={selectedFundManagerName}
                  onChange={handleFundManagerSelection}
                >
                  <option value="">Select Fund Manager</option>
                  {fundManagers.map((manager) => (
                    <option key={manager.fundManagerid} value={manager.fundManagerName}>
                      {manager.fundManagerName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fundManagerId">Fund Manager ID</label>
                <input
                  type="text"
                  id="fundManagerId"
                  value={selectedFundManagerId}
                  readOnly
                />
              </div>
              <Button variant="contained" onClick={handleAddTransaction}>
                Submit
              </Button>
            </form>
            {confirmationMessage && (
              <Typography variant="body2" color="primary">
                {confirmationMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} className="scrollable-center">
        <Card>
          <CardContent>
            <Typography variant="h6">Fund Transactions</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fund Manager ID</TableCell>
                  <TableCell>Fund Acc Balance</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Bank Account No</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {funds
                  .sort((a, b) => new Date(b.tranTime) - new Date(a.tranTime))
                  .map((fund) => (
                    <TableRow
                      key={fund.recId}
                      style={{
                        backgroundColor:
                          fund.tranType === "c" ? "#e8f5e9" : "#ffebee",
                      }}
                    >
                      <TableCell>{fund.fundManagerId}</TableCell>
                      <TableCell>{fund.fundAccBalance}</TableCell>
                      <TableCell>{fund.amount}</TableCell>
                      <TableCell>{fund.tranType}</TableCell>
                      <TableCell>{new Date(fund.tranTime).toLocaleDateString()}</TableCell>
                      <TableCell>{fund.bankAccNo}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3} className="fixed-right">
        <Card>
          <CardContent>
            <Typography variant="h6">Fund Managers</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Current Balance</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundManagers.map((manager) => (
                  <TableRow key={manager.fundManagerid}>
                    <TableCell>{manager.fundManagerid}</TableCell>
                    <TableCell>{manager.fundManagerName}</TableCell>
                    <TableCell>{manager.currentBalance}</TableCell>
                    <TableCell>{new Date(manager.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FundManagement;
