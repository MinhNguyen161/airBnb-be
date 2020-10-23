const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exp = require("./experience");
const reviewSchema = Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.ObjectId, required: true, ref: "User" },
        experience: { type: Schema.ObjectId, required: true, ref: "Experience" },
        rating: { type: Number, }
    },
    { timestamps: true }
);

reviewSchema.statics.calculateReviews = async function (expId) {
    const reviewCount = await this.find({ experience: expId }).countDocuments();
    await Exp.findByIdAndUpdate(expId, { reviewCount: reviewCount });
};

//================================================================================
reviewSchema.post("save", async function () {
    await this.constructor.calculateReviews(this.experience); // PHAI PASS CAI ID CUA NO VAO
});
//================================================================================




// Neither findByIdAndUpdate norfindByIdAndDelete have access to document middleware.
// They only get access to query middleware
// Inside this hook, this will point to the current query, not the current review.
// Therefore, to access the review, we’ll need to execute the query


reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.doc = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
    await this.doc.constructor.calculateReviews(this.doc.experience);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;