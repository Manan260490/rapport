const mongoose = require("mongoose");

const menuMasterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "MenuMaster", default: null },
  isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

// Virtual Children
menuMasterSchema.virtual("children", {
  ref: "MenuMaster",
  localField: "_id",
  foreignField: "parent",
  justOne: false
});

// Enable virtuals in JSON
menuMasterSchema.set("toJSON", { virtuals: true });
menuMasterSchema.set("toObject", { virtuals: true });
menuMasterSchema.pre(/^find/, function () {
  this.populate({
    path: "children",
    populate: {
      path: "children",
      populate: {
        path: "children"
      }
    }
  });
});
module.exports = mongoose.model("MenuMaster", menuMasterSchema);
