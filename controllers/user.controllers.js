const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const userController = {}


userController.createUser = catchAsync(async (req, res, next) => {
    let { name, email, password, location, language, } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return (next(new AppError(400, "User already exists", "Register Error")))
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({
        name, email, password, location, language
    })
    const accessToken = await user.generateToken();
    console.log(user)
    return sendResponse(res, 200, true, { user, accessToken }, null, "Create user successful");
})

userController.getSingleUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new AppError(400, "User not found", "Get Current User Error"));
    return sendResponse(
        res,
        200,
        true,
        user,
        null,
        "Get User successful"
    );
});


module.exports = userController