const http  = require("http");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); //{ path: '/.env' }



const app = express();
const port = process.env.PORT || 5000;

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("Connect to MongoDB successfully")
  } catch (error) {
      console.log("Connect failed " + error.message )
      process.exit(1);
  }
}

app.use(cors({
  origin: 'https://experimentsd-o0d1lusk2-paulas-projects-16fd8cb8.vercel.app'
}));

const apiRoutes = require('./routes/api');
app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const server = http.createServer(app);

connectDB();
