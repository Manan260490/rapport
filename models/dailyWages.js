const mongoose = require("mongoose");

const dailyWagesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
  },
  allWages: {
    type: Array,
    default: [],
  },
});

module.exports = dailyWages = mongoose.model("DailyWages", dailyWagesSchema);
