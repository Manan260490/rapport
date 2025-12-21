const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  otp: String,
  startTime: Date,
});

module.exports = PasswordReset = mongoose.model(
  "passwordResets",
  passwordResetSchema
);
