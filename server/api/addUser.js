const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try{
    if (allowCORS(req, res, () => {})) {
      return;
    }
    const { userId, loginTime } = req.body;
    console.log('userId:', userId);
    console.log('loginTime:', loginTime);
    
    if (!userId || !loginTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const userExists = await ExperimentModel.findOne({ userId: userId});

    if (userExists !== null) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const login_time = new Date(loginTime);
    const newUser = new ExperimentModel({ userId:userId, login_time: login_time, ratings: [] });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
  
  
}