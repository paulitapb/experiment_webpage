
const express = require('express');
const router = express.Router();
const ExperimentModel = require('../models/ExperimentModel');


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



router.post('/ratings:userId', async (req, res) => {
  const {imgId, imgGroup, imgGeneratedBy, promptUsed, rating } = req.body;
  const userId = req.params.userId;

  try {
    let user = await ExperimentModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.ratings.push({ imgId, imgGroup, imgGeneratedBy, promptUsed, rating });
    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;