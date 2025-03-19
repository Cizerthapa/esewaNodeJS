const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transaction_uuid: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
