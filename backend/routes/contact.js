// routes/contact.js

const express = require('express');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { name, subject, email, message } = req.body;
    try {
        const result = await sendEmail(email, subject, `
            <h1>New Message from ${name}</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Failed to send email');
    }
});

module.exports = router;
