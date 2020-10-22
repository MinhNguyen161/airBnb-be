const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers")


/**
 * @route POST api/users
 * @description Register new user
 * @access Public
 */
router.post("/", userController.createUser);
/**
 * @route GET /user/:id
 * @description Get current user info
 * @access Login required
 */
router.get("/:id", userController.getUser);


module.exports = router;