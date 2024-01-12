
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error', err));
