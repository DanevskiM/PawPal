// const pool = require('../db');

// async function createReservation(data) {
//   const [result] = await pool.query(
//     `INSERT INTO reservations
//       (pet_name, breed, arrival_date, departure_date, package_name, notes, payment_status)
//      VALUES (?, ?, ?, ?, ?, ?, ?)`,
//     [
//       data.petName,
//       data.breed,
//       data.arrivalDate,
//       data.departureDate,
//       data.packageName,
//       data.notes,
//       'pending'
//     ]
//   );

//   return { id: result.insertId };
// }

// module.exports = {
//   createReservation,
// };

const pool = require('../db');

async function getReservationByRegistrationId(registrationId) {
  const [rows] = await pool.query(
    `SELECT id, registration_id, payment_status, package_name
     FROM reservations
     WHERE registration_id = ?`,
    [registrationId]
  );

  return rows[0] || null;
}

async function createReservation(data) {
  const [result] = await pool.query(
    `INSERT INTO reservations
      (registration_id, pet_name, breed, arrival_date, departure_date, package_name, notes, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.registrationId,
      data.petName,
      data.breed,
      data.arrivalDate,
      data.departureDate,
      data.packageName,
      data.notes,
      'pending',
    ]
  );

  return { id: result.insertId };
}

async function markReservationPaid(registrationId) {
  await pool.query(
    `UPDATE reservations
     SET payment_status = 'paid'
     WHERE registration_id = ?`,
    [registrationId]
  );
}

module.exports = {
  getReservationByRegistrationId,
  createReservation,
  markReservationPaid,
};