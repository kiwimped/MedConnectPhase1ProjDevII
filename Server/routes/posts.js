const express = require('express');
const PostReview = require('../models/post'); 
const router = express.Router();

// POST route to create a new review
router.post('/postreview', async (req, res) => {
  try {
    const { title, context, toName, rate } = req.body;
    const fromName = req.body.name || "Anonymous";  // Assume user info is attached to req.user
    const date = new Date();         // Set the current date and time

    const newPost = new PostReview({ title, context, fromName, toName, date, rate });

    await newPost.save();
    res.status(201).json({ message: 'Posted Review stored successfully', newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error saving Review', error });
  }
});
  
  // GET route to fetch all reviews
  router.get('/postreview', async (req, res) => {
    try {
      const posts = await PostReview.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  });
  
  // DELETE route to delete a review by ID
  router.delete('/postreview/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await PostReview.findByIdAndDelete(id);
      res.send('PostReview deleted successfully');
    } catch (error) {
      res.status(500).json({ message: 'Error deleting PostReview', error });
    }
  });
  
  // PUT route to update a review by ID
  router.put('/postreview/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, context, toName, rate } = req.body;
      const fromName = req.user.name;  // Assume user info is attached to req.user
      const date = new Date();         // Set the current date and time
  
      const updatedPostReview = await PostReview.findByIdAndUpdate(
        id,
        { title, context, fromName, toName, date, rate },
        { new: true }  // Return the updated document
      );
  
      if (!updatedPostReview) {
        return res.status(404).json({ message: 'PostReview not found' });
      }
  
      res.json(updatedPostReview);
    } catch (error) {
      res.status(500).json({ message: 'Error updating PostReview', error });
    }
  });
  
  module.exports = router;