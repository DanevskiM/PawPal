const { stripe, createPaymentIntent } = require('../services/stripe.service');
const pool = require('../db');

const createPayment = async (req, res) => {
  try {
    const { amount, reservationId, packageName } = req.body;

    if (!amount || !reservationId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and reservationId are required',
      });
    }

    const paymentIntent = await createPaymentIntent(amount, {
      reservationId: String(reservationId),
      packageName: packageName || '',
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.created': {
        const paymentIntent = event.data.object;
        console.log('Payment intent created:', paymentIntent.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const reservationId = paymentIntent.metadata?.reservationId;

        console.log('Payment succeeded:', paymentIntent.id);
        console.log('Metadata:', paymentIntent.metadata);
        console.log('Reservation ID from metadata:', reservationId);

        if (!reservationId) {
          console.log('No reservationId found in metadata');
          break;
        }

        const [result] = await pool.query(
          'UPDATE reservations SET payment_status = ?, payment_intent_id = ? WHERE id = ?',
          ['paid', paymentIntent.id, reservationId]
        );

        console.log('DB update result:', result);
        console.log('Affected rows:', result.affectedRows);

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const reservationId = paymentIntent.metadata?.reservationId;

        console.log('Payment failed:', paymentIntent.id);
        console.log('Metadata:', paymentIntent.metadata);
        console.log('Reservation ID from metadata:', reservationId);

        if (!reservationId) {
          console.log('No reservationId found in metadata');
          break;
        }

        const [result] = await pool.query(
          'UPDATE reservations SET payment_status = ?, payment_intent_id = ? WHERE id = ?',
          ['failed', paymentIntent.id, reservationId]
        );

        console.log('DB update result:', result);
        console.log('Affected rows:', result.affectedRows);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook handling error:', error);
    return res.status(500).json({ message: 'Webhook handling failed' });
  }
};

module.exports = {
  createPayment,
  handleWebhook,
};