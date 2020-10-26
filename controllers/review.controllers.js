const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Review = require("../models/review")
const Exp = require("../models/experience")
const reviewController = {}


reviewController.createReview = catchAsync(async (req, res, next) => {
    let userId = req.userId;
    let expId = req.params.id;
    let { content, rating } = req.body;
    let exp = Exp.find(expId);
    if (!exp)
        return next(new AppError(404, "Experience not found", "Get Reviews Error"));
    review = await Review.create({
        content, rating,
        user: userId,
        experience: expId,
        rating
    })
    return sendResponse(res, 200, true, { review }, null, "Create user successful");
})


reviewController.getAllReviews = catchAsync(async (req, res, next) => {
    const expId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const exp = Exp.findById(expId);
    if (!exp)
        return next(new AppError(404, "Experience not found", "Get Reviews Error"));

    const totalReviews = await Review.countDocuments({ experience: expId });
    const totalPages = Math.ceil(totalReviews / limit);
    const offset = limit * (page - 1);
    const reviews = await Review.find({ experience: expId })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("user")

    return sendResponse(res, 200, true, { reviews, totalPages }, null, "");
});


module.exports = reviewController