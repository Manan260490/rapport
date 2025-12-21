const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
    status: {
        type: String,
        default:"pending"
    },
    full_name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required:true
    },
    slug: {
        type: String,
        required:true
    },
    timeStamp: {
        type: Date,
        required:true
    },
    nameOfImage:String
});

module.exports = Callback = mongoose.model("callback", callbackSchema);