const User = require("../models/user")
const Exp = async (req, res) => {
    const exp = await Experience.find();
    res.json(exp);

}


module.exports = {

}