const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/payment.routes');
const contactRoutes = require('./routes/contact.routes');
const reservationRoutes = require('./routes/reservation.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.use('/api', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/registrations', require('./routes/registration.routes'));

app.get('/', (req, res) => {
  res.send('PawPal backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});