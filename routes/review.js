const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controllers")
const authMiddleware = require("../middleware/authentication");



/**
 * @route POST api/users
 * @description create a review for an experience
 * @access Public
 */
router.post("/:id", authMiddleware.loginRequired, reviewController.createReview); //Dung sau
/**
 * @route GET /user/:id
 * @description Get all reviews from an Experience
 * @access Public
 */
router.get("/getall/:id", reviewController.getAllReviews); //



module.exports = router;

