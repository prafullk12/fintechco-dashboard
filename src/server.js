const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/metrics', (req, res) => {
  const metrics = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/metrics.json'), 'utf8'));
  res.json(metrics);
});

app.get('/api/transactions', (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/transactions.json'), 'utf8'));
  const { page = 1, limit = 20, category, type, account } = req.query;
  let filtered = transactions;
  if (category) filtered = filtered.filter(t => t.category === category);
  if (type) filtered = filtered.filter(t => t.type === type);
  if (account) filtered = filtered.filter(t => t.account === account);
  const start = (page - 1) * limit;
  res.json({
    total: filtered.length,
    page: Number(page),
    limit: Number(limit),
    data: filtered.slice(start, start + Number(limit))
  });
});

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`FintechCo Dashboard running on http://localhost:${PORT}`);
});
