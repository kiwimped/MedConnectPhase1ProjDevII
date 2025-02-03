const express = require('express');
const UserModel = require('../models/user');  // Import your User model
const router = express.Router();

// GET route to search doctors
router.get('/search', async (req, res) => {
    const { query, specialty} = req.query;
  
    try {
      const doctors = await UserModel.find({
        isDoctor: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialty: { $regex: query, $options: 'i' } },
        ],
        ...(specialty && { specialty }),            // Filter by city if provided
      });
  
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching doctors', error: err });
    }
  });
module.exports = router;
