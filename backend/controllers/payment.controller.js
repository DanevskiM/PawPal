const { stripe, createPaymentIntent } = require('../services/stripe.service');

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

const handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
};

module.exports = {
  createPayment,
  handleWebhook,
};