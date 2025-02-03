// In your Express route (assuming you're using Express)
const express = require('express');
const UserModel = require('../models/user'); // Assuming this is your User model
const router = express.Router();

// GET route to fetch doctor details by ID
router.get('/doctor/:id', async (req, res) => {
  try {
    console.log(`Fetching doctor with ID: ${req.params.id}`);  // Log the ID to ensure it's being passed correctly
    
    const doctor = await UserModel.findById(req.params.id);  // Fetch doctor by ID
    
    if (!doctor) {
      console.log('Doctor not found');
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    console.log('Doctor found:', doctor);  // Log doctor details for debugging
    res.json(doctor);  // Send the doctor's details in the response
  } catch (error) {
    console.error('Error fetching doctor:', error);  // Log the error
    res.status(500).json({ message: 'Error fetching doctor details', error });
  }
});
// Route to get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await UserModel.find({ isDoctor: true }).select('-password'); // Exclude password
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctor list' });
  }
});

module.exports = router;
