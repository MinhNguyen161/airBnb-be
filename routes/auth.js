const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
/**
 * @route POST api/auth/login
 * @description Login
 * @access Public
 */

router.post("/login", authController.loginWithEmail); //


module.exports = router;

/**

 * @route POST api/auth/login/facebook
 * @description Login with facebook
 * @access Public
 *  */
/**
router.post(
    "/login/facebook",
    passport.authenticate("facebook-token"),
    authController.loginWithFacebookOrGoogle
);
*/