require("dotenv").config();
const key = process.env.STRIPE_KEY;
const stripe = require("stripe")(key);

exports.createCheckoutSession = async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.lookup_key],
    expand: ["data.product"],
  });
  console.log("P", prices);

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
  });

  res.redirect(303, session.url);
};

exports.customerPortal = async (req, res) => {
  console.log("req", req);
  const { customer_id } = req.body;

  const returnUrl = process.env.CLIENT_URL;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
};

exports.webhook = async (req, res) => {
  let data;
  let eventType;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  let signature = req.headers["stripe-signature"];
  console.log("Stripe Signature:", signature);
  console.log("raw body", req.rawBody);

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send("Webhook Error: " + err.message);
  }

  data = event.data;
  eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed":
      console.log(data);
      console.log("Checkout Session Completed");
      break;
    case "checkout.session.canceled":
      console.log("Checkout Session Canceled");
      break;
    case "checkout.session.payment_failed":
      console.log("Checkout Session Payment Failed");
      break;
    case "invoice.paid":
      console.log("Invoice Paid");
      break;
    case "invoice.payment_failed":
      console.log("Invoice Payment Failed");
      break;

    default:
      // Unexpected event type
      return res.status(400).send("Webhook Error: Unexpected event type");
  }
};
