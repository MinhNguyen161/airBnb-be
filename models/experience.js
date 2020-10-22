const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    title: String,
    pictureUrl: String,
    country: String,
    minimumRate: Number,
    duration: Number
})

const Experience = mongoose.model("Experience", schema);
module.exports = Experience;


