const mongoose = require("mongoose");

const lawUpdatesSeoSchema = new mongoose.Schema({
  titleTag: {
    type: String,
  },
  descriptionTag: {
    type: String,
  },
});

module.exports = LawUpdatesSeo = mongoose.model(
  "lawUpdatesSeos",
  lawUpdatesSeoSchema
);
