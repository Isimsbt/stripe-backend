const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51R4ton2MVt6ZQbAT6brPhusocUWaPakFbHSAHoWgQVpyX7o0NjtWnetMtKaPGQJqpwgs0Qkp0FUwhLA0Qsn59OPS00CLUDwGiz'); // Remplacez par votre clé secrète Stripe

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Montant en centimes
      currency: currency,
      payment_method_types: ['card'],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});