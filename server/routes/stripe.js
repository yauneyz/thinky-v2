const express = require("express");
const StripeController = require("../controllers/StripeController");

const router = express.Router();

router.post("/create-checkout-session", StripeController.createCheckoutSession);
router.post("/create-portal-session", StripeController.customerPortal);
router.post("/webhook", express.raw(), StripeController.webhook);

module.exports = router;
