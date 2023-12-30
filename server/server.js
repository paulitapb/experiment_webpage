const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI);


app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
