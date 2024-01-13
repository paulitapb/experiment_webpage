
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error', err));

  const allowCORS = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //TODO change this to the web domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  };
  
module.exports = { mongoose, allowCORS };
