const mongoose = require("mongoose");
const { schema } = require("./experience");
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

//================================
//
//  Model for a user
//
//
//================================
const userSchema = Schema(
    {
        // ============================================================
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatarUrl: { type: String, require: false, default: "" },
        password: { type: String, required: true, select: false },
        location: { type: String, required: true },
        language: { type: String, required: true },
        // ============================================================
        emailVerificationCode: { type: String, select: false, required: false },
        emailVerified: { type: Boolean, require: false, default: false }, //chinh thang true sau
        //=============================================================
        isDeleted: { type: Boolean, default: false, select: false },
        //=============================================================
        isLike: { type: Boolean, default: false, }
    },
    { timestamps: true }
);
userSchema.methods.generateToken = async function () {
    const accessToken = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return accessToken;
};


const User = mongoose.model("User", userSchema);
module.exports = User;