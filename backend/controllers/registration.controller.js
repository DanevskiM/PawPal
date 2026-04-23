const crypto = require('crypto');
const { sendRegistrationEmails } = require('../services/email.service');
const { registrations } = require('../stores/registration.store');

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

    const registrationId = crypto.randomUUID();

    const registrationRecord = {
      registrationId,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    registrations.set(registrationId, registrationRecord);

    await sendRegistrationEmails({
      ...formData,
      registrationId,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      registrationId,
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

const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = registrations.get(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    return res.status(200).json(registration);
  } catch (error) {
    console.error('Get registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load registration',
      error: error.message,
    });
  }
};

module.exports = {
  submitRegistration,
  getRegistrationById,
};