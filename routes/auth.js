const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validators");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controllers");
// const passport = require("passport")

/**
 * @route POST api/auth/login
 * @description Login
 * @access Public
 */
router.post("/login", authController.loginWithEmail);
/**
 * @route POST api/auth/login/facebook
 * @description Login with facebook
 * @access Public
 *  */


module.exports = router;


/**
 * @route POST api/auth/login/google
 * @description Login with google
 * @access Public
 */

//     "/login/google",
//     passport.authenticate("google-token"),
//     authController.loginWithFacebookOrGoogle
// )



// router.post(
//     "/login/facebook",
//     passport.authenticate("facebook-token"),
//     authController.loginWithFacebookOrGoogle
// );