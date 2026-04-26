const fs = require('fs');

const categories = {
  debit: [
    { name: 'Food & Dining', vendors: ['Whole Foods', 'Trader Joes', 'Chipotle', 'Starbucks', 'McDonalds', 'Subway', 'Panera Bread', 'Dominos Pizza', 'Uber Eats', 'DoorDash'] },
    { name: 'Transport', vendors: ['Uber', 'Lyft', 'Shell Gas', 'Chevron', 'BP Gas', 'Metro Transit', 'Parking Meter', 'EZPass Toll'] },
    { name: 'Shopping', vendors: ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Nordstrom', 'ZARA', 'Nike Store', 'Apple Store', 'Costco'] },
    { name: 'Housing', vendors: ['Rent Payment', 'Home Depot', 'IKEA', 'Lowes', 'Maintenance Fee'] },
    { name: 'Entertainment', vendors: ['Netflix', 'Spotify', 'Hulu', 'Disney+', 'AMC Theaters', 'Steam Games', 'Concert Tickets', 'Eventbrite'] },
    { name: 'Health', vendors: ['CVS Pharmacy', 'Walgreens', 'Gold\'s Gym', 'Planet Fitness', 'Doctor Office', 'Dental Clinic', 'Vision Center'] },
    { name: 'Utilities', vendors: ['Electric Bill', 'Water Bill', 'Internet - Comcast', 'AT&T Mobile', 'Verizon', 'Gas Bill'] },
    { name: 'Travel', vendors: ['Delta Airlines', 'United Airlines', 'Airbnb', 'Marriott Hotel', 'Hilton Hotel', 'Expedia', 'Hertz Car Rental'] },
    { name: 'Education', vendors: ['Udemy Course', 'Coursera', 'Amazon Books', 'Campus Bookstore', 'Tuition Payment'] },
    { name: 'Insurance', vendors: ['State Farm', 'Geico Auto', 'Blue Cross Health', 'Renters Insurance'] },
  ],
  credit: [
    { name: 'Income', vendors: ['Salary Deposit', 'Direct Deposit - Employer', 'Payroll'] },
    { name: 'Freelance', vendors: ['Freelance Payment', 'Client Invoice Payment', 'Upwork Transfer', 'Fiverr Payout'] },
    { name: 'Investment', vendors: ['Dividend Received', 'Stock Sale Proceeds', 'ETF Distribution', 'Interest Payment'] },
    { name: 'Refund', vendors: ['Amazon Refund', 'Target Refund', 'Insurance Reimbursement', 'Tax Refund'] },
    { name: 'Transfer', vendors: ['Bank Transfer In', 'Zelle Received', 'Venmo Credit', 'PayPal Transfer In'] },
  ]
};

const accounts = ['checking', 'savings', 'investment', 'credit_card'];

const amountRanges = {
  'Food & Dining': [8, 120],
  'Transport': [15, 200],
  'Shopping': [20, 500],
  'Housing': [800, 1500],
  'Entertainment': [10, 150],
  'Health': [15, 350],
  'Utilities': [40, 250],
  'Travel': [150, 1200],
  'Education': [20, 800],
  'Insurance': [80, 400],
  'Income': [4500, 6500],
  'Freelance': [100, 2000],
  'Investment': [50, 500],
  'Refund': [15, 300],
  'Transfer': [100, 1000],
};

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDate(year, month) {
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const transactions = [];
let id = 1;

// Generate ~26 transactions per month for 12 months (Jan 2024 - Dec 2024) = ~312 total
for (let month = 1; month <= 12; month++) {
  // Fixed monthly credits: salary
  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-01`,
    type: 'credit',
    amount: randomBetween(5000, 5400),
    currency: 'USD',
    description: 'Salary Deposit',
    category: 'Income',
    account: 'checking',
    status: 'completed'
  });

  // Fixed monthly debits: rent, utilities
  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-02`,
    type: 'debit',
    amount: randomBetween(900, 950),
    currency: 'USD',
    description: 'Rent Payment',
    category: 'Housing',
    account: 'checking',
    status: 'completed'
  });

  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-03`,
    type: 'debit',
    amount: randomBetween(85, 130),
    currency: 'USD',
    description: 'Electric Bill',
    category: 'Utilities',
    account: 'checking',
    status: 'completed'
  });

  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-05`,
    type: 'debit',
    amount: 79.99,
    currency: 'USD',
    description: 'Internet - Comcast',
    category: 'Utilities',
    account: 'checking',
    status: 'completed'
  });

  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-05`,
    type: 'debit',
    amount: 15.99,
    currency: 'USD',
    description: 'Netflix',
    category: 'Entertainment',
    account: 'credit_card',
    status: 'completed'
  });

  transactions.push({
    id: `txn_${String(id++).padStart(4, '0')}`,
    date: `2024-${String(month).padStart(2, '0')}-06`,
    type: 'debit',
    amount: 9.99,
    currency: 'USD',
    description: 'Spotify',
    category: 'Entertainment',
    account: 'credit_card',
    status: 'completed'
  });

  // Random transactions for the month
  const randomCount = 20;
  for (let i = 0; i < randomCount; i++) {
    const isCredit = Math.random() < 0.2;
    const typeKey = isCredit ? 'credit' : 'debit';
    const catGroup = randomItem(categories[typeKey]);
    const vendor = randomItem(catGroup.vendors);
    const range = amountRanges[catGroup.name];
    const amount = randomBetween(range[0], range[1]);
    const account = isCredit ? randomItem(['checking', 'savings', 'investment']) : randomItem(['checking', 'credit_card']);

    transactions.push({
      id: `txn_${String(id++).padStart(4, '0')}`,
      date: generateDate(2024, month),
      type: typeKey,
      amount,
      currency: 'USD',
      description: vendor,
      category: catGroup.name,
      account,
      status: Math.random() > 0.03 ? 'completed' : 'pending'
    });
  }
}

// Sort by date
transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

console.log(`Generated ${transactions.length} transactions`);
fs.writeFileSync('./data/transactions.json', JSON.stringify(transactions, null, 2));
