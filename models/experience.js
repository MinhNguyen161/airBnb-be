const mongoose = require("mongoose")
const Schema = mongoose.Schema

//================================
//
//  Model for an experience
//
//
//================================
const schema = Schema({
    title: { type: String, required: true },
    pictureUrl: [{ type: String, required: false }],
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: { type: String, required: true },
    reviewCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    whatToBring: [String],
    isDeleted: false,
})

// Calculate ratings from User.

const Experience = mongoose.model("Experience", schema);
module.exports = Experience;


