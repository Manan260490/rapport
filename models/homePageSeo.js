const mongoose = require("mongoose");

const homepageSeoSchema = new mongoose.Schema({
  titleTag: {
    type: String,
  },
  descriptionTag: {
    type: String,
  },
  h1tag: {
    type: String,
  },
});

module.exports = HomepageSeo = mongoose.model(
  "homepageSeos",
  homepageSeoSchema
);
