require('dotenv').config();
const Stripe = require('stripe');
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_SECRET_KEY prefix:', process.env.STRIPE_SECRET_KEY?.slice(0, 7));
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, metadata = {}) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'mkd',
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

module.exports = {
  stripe,
  createPaymentIntent,
};