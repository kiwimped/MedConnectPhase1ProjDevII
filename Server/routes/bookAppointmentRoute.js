const express = require('express');
const patientBookModel = require('../models/bookAppointment'); // Appointment model
const User = require('../models/user'); // Import User model
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const jwt = require('jsonwebtoken'); // If token generation is required
require('dotenv').config(); // Load environment variables
const router = express.Router();

router.post("/send-appointment-email", async (req, res) => {
    try {
        const { email,date,time,provider } = req.body;
        if (!email || !date || !time || !provider) {
            return res.status(400).json({ error: 'All fields are required (email, date, time, provider).' });
          }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const appointment = new patientBookModel({date,time,provider});
        await appointment.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Optional, can help in case of certificate issues
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Appointment Confirmation',
            text: `Your appointment has been booked successfully!\n\nDetails:\n- Provider: ${provider}\n- Date: ${date}\n- Time: ${time}\n\nThank you for using our service!`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error); // Log email error
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ message: 'Appointment email sent successfully.' });
              }
        });
    } catch (error) {
        console.error('Error in forgotpassword function:', error); // Log any other errors
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;