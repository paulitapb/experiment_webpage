
const express = require('express');
const router = express.Router();
const ExperimentModel = require('../models/ExperimentModel');
require('dotenv').config()

router.get('/ratings', async (req, res) => {
  try {
    const ratings = await ExperimentModel.find();
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/checkUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userExists = await ExperimentModel.exists({ userId });
    res.json({ userExists });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/hasRated', async (req, res) => {
  const { userId, imgId } = req.query;

  const rating = await RatingModel.findOne({ userId, imgId });

  if (rating) {
    res.json({ hasRated: true });
  } else {
    res.json({ hasRated: false });
  }
});

router.post('/addUser', async (req, res) => {
  const { userId } = req.body;

  try {
    const userExists = await ExperimentModel.findOne({ userId: userId });

    if (userExists !== null) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new ExperimentModel({ userId, ratings: [] });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



router.post('/addRating', async (req, res) => {
  const {userId, imgId, imgGroup, imgGeneratedBy, promptUsed, rating } = req.body; 
  
  if (!imgId || !imgGroup || !promptUsed || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let user = await ExperimentModel.findOne({ userId: String(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.ratings.push({ 
      imgId:  imgId, 
      imgGroup: imgGroup, 
      imgGeneratedBy: imgGeneratedBy, 
      promptUsed: promptUsed, 
      rating: rating });
    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});


module.exports = router;