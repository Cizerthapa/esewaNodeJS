const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// Home page
router.get("/", propertyController.getProperties);

// Property details
router.get("/property/:id", propertyController.getPropertyDetails);

// Initiate payment
router.post("/payment", propertyController.initiatePayment);

// Payment success callback
router.get("/payment/success", propertyController.paymentSuccess);

// Payment failure callback
router.get("/payment/failure", propertyController.paymentFailure);

module.exports = router;
