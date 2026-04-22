const pool = require('../db');

async function createReservation(data) {
  const [result] = await pool.query(
    `INSERT INTO reservations
      (pet_name, breed, arrival_date, departure_date, package_name, notes, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.petName,
      data.breed,
      data.arrivalDate,
      data.departureDate,
      data.packageName,
      data.notes,
      'pending'
    ]
  );

  return { id: result.insertId };
}

module.exports = {
  createReservation,
};