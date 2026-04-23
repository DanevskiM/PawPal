const { sendRegistrationEmails } = require('../services/email.service');

const submitRegistration = async (req, res) => {
  try {
    const formData = req.body;
    const { ownerInfo, petInfo, stayInfo } = formData;

    if (
      !ownerInfo?.firstName ||
      !ownerInfo?.lastName ||
      !ownerInfo?.email ||
      !ownerInfo?.phone ||
      !petInfo?.name ||
      !petInfo?.breed ||
      !petInfo?.gender ||
      !stayInfo?.checkInDateTime ||
      !stayInfo?.termsAccepted
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    await sendRegistrationEmails(formData);

    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
    });
  } catch (error) {
    console.error('Registration submit error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit registration',
      error: error.message,
    });
  }
};

module.exports = {
  submitRegistration,
};