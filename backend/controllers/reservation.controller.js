const { createReservation } = require('../services/reservation.service');
const { registrations } = require('../stores/registration.store');

const createReservationHandler = async (req, res) => {
  try {
    const { registrationId, packageName } = req.body;

    if (!registrationId || !packageName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const registration = registrations.get(String(registrationId));

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    const petName = registration?.petInfo?.name;
    const breed = registration?.petInfo?.breed || '';
    const arrivalDate = registration?.stayInfo?.checkInDateTime;
    const departureDate = registration?.stayInfo?.checkOutDateTime;
    const notes = registration?.stayInfo?.additionalNotes || '';

    if (!petName || !arrivalDate || !departureDate || !packageName) {
      return res.status(400).json({
        success: false,
        message: 'Registration data is incomplete for reservation',
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);

    arrival.setHours(0, 0, 0, 0);
    departure.setHours(0, 0, 0, 0);

    if (arrival < today) {
      return res.status(400).json({
        success: false,
        message: 'Arrival date cannot be before today',
      });
    }

    if (departure <= arrival) {
      return res.status(400).json({
        success: false,
        message: 'Departure date must be after arrival date',
      });
    }

    const reservation = await createReservation({
      petName,
      breed,
      arrivalDate,
      departureDate,
      packageName,
      notes,
    });

    return res.status(200).json({
      success: true,
      reservationId: reservation.id,
      message: 'Reservation created successfully',
    });
  } catch (error) {
    console.error('Reservation error:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to create reservation',
    });
  }
};

module.exports = {
  createReservationHandler,
};