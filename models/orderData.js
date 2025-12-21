const mongoose = require("mongoose");

const orderDataSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderData: {
    type: Object,
    required: true,
  },
  responseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customerResponse",
  },
});

module.exports = OrderData = mongoose.model("orderData", orderDataSchema);
