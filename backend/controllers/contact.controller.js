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

    let adminEmailSent = false;
    let customerEmailSent = false;
    let emailErrors = [];

    try {
      await transporter.sendMail({
        from: `"PawPal Contact" <${process.env.EMAIL_USER}>`,
        to: email,
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

      adminEmailSent = true;
    } catch (mailErr) {
      emailErrors.push(`Admin email failed: ${mailErr.message}`);
      console.error('Admin email failed:', mailErr);
    }

    try {
      await transporter.sendMail({
        from: `"PawPal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Го примивме вашето прашање - PawPal',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Ви благодариме што не контактиравте</h2>
            <p>Здраво ${fullName},</p>
            <p>Го примивме вашето прашање и нашиот тим ќе ви одговори во најкраток можен рок.</p>
            <p><strong>Вашето прашање:</strong></p>
            <p>${message}</p>
            <br />
            <p>Поздрав,</p>
            <p><strong>PawPal</strong></p>
          </div>
        `,
      });

      customerEmailSent = true;
    } catch (mailErr) {
  console.error('Customer email failed:', mailErr);

  emailError =
    mailErr?.message ||
    mailErr?.response ||
    mailErr?.code ||
    'Unknown email error';
}

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertId,
      adminEmailSent,
      customerEmailSent,
      emailErrors,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { submitContactForm };