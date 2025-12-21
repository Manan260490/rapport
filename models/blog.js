const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
  },
  titleTag: String,
  metaDescription: String,
  altImage: String,

  filename: String,
});

module.exports = Blog = mongoose.model("blog", blogSchema);
