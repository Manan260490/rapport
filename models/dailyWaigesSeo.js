const mongoose = require("mongoose");

const dailyWagesSeoSchema = new mongoose.Schema({
  titleTag: {
    type: String,
  },
  descriptionTag: {
    type: String,
  },
});

module.exports = DailyWagesSeo = mongoose.model(
  "dailyWagesSeos",
  dailyWagesSeoSchema
);
