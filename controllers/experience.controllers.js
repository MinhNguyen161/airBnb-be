const Experience = require("../models/experience")

const getExp = async (req, res) => {
    const exp = await Experience.find();
    res.json(exp);

}
const createExp = async (req, res) => {
    const { title, pictureUrl, country, minimumRate, duration } = req.body;

    const exp = await Experience.create({
        title,
        pictureUrl,
        country,
        minimumRate,
        duration,
    })
    res.json({
        success: true,
        data: exp,
        message: " getting it sucessss!"
    })

}
module.exports = {
    getExp,
    createExp,
}