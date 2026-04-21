const pool = require('../db');

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

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertId,
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