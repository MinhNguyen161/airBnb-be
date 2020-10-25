const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Experience = require("../models/experience")
const expController = {};

expController.createExp = catchAsync(async (req, res) => {
    const { title, pictureUrl, country, price, duration, whatToBring, content, author } = req.body;
    const exp = await Experience.create({
        title,
        pictureUrl,
        country,
        price,
        duration,
        whatToBring,
        content,
        author,
    })
    return sendResponse(res, 200, true, exp, null, "Successfully created an Experience")
})


expController.getSingleExp = catchAsync(async (req, res) => {
    const exp = await (await Experience.findById(req.params.id))
    if (!exp) {
        return next(new AppError(404, "Experience not found", "Get Single Experience Error"));
    }
    return sendResponse(res, 200, true, exp, null, `Successfully get ${exp.title} Experience`)
})

expController.getAllExp = catchAsync(async (req, res, next) => {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalExp = await Experience.countDocuments({
        ...filter,
        isDeleted: false,
    })
    const totalPages = Math.ceil(totalExp / limit);
    const offset = limit * (page - 1);
    const exps = await Experience.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("user")
        .populate("author");

    return sendResponse(res, 200, true, { exps, totalPages }, null, "");
})

module.exports = expController