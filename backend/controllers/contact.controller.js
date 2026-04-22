const pool = require('../db');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email and message are required',
      });
    }

    const sql = `
      INSERT INTO contact_messages (full_name, email, phone, message)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      fullName,
      email,
      phone || null,
      message,
    ]);

    try {
      await transporter.sendMail({
        from: `"PawPal Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: 'New contact question - PawPal',
        html: `
          <h2>New contact form question</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      await transporter.sendMail({
        from: `"PawPal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Го примивме вашето прашање',
        html: `
          <p>Здраво ${fullName},</p>
          <p>Го примивме вашето прашање и ќе ви одговориме наскоро.</p>
          <p>Поздрав,<br>PawPal</p>
        `,
      });

      emailSent = true;
    } catch (mailErr) {
      emailError = mailErr.message;
      console.error('Email sending failed:', mailErr);
    }

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertId,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { submitContactForm };