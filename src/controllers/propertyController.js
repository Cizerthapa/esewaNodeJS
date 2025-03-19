const Property = require("../models/Property");
const crypto = require("crypto");
require("dotenv").config();

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.render("index", { properties });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.render("property", { property });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.initiatePayment = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    const transaction_uuid = `txn-${Date.now()}`;
    const total_amount = property.price;
    const product_code = process.env.ESEWA_PRODUCT_CODE;
    const success_url = process.env.SUCCESS_URL;
    const failure_url = process.env.FAILURE_URL;

    // Generate eSewa signature
    const signatureData = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
      .update(signatureData)
      .digest("base64");

    res.render("payment", {
      amount: total_amount,
      transaction_uuid,
      product_code,
      signature,
      success_url,
      failure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.paymentSuccess = (req, res) => {
  res.render("success");
};

exports.paymentFailure = (req, res) => {
  res.render("failure");
};
