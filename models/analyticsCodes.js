const mongoose = require("mongoose");

const analyticsCodesSchema = new mongoose.Schema({
  googleTag: {
    type: String,
  },
  googleAnalytics: {
    type: String,
  },
  facebookPixel: {
    type: String,
  },
  googleWebmaster: {
    type: String,
  },
});

module.exports = AnalyticsCodes = mongoose.model(
  "analyticsCodes",
  analyticsCodesSchema
);
