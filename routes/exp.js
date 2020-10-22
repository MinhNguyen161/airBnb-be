var express = require('express');
var router = express.Router();
const expController = require("../controllers/experience.controllers")
/**
 * @route POST exp
 * @description Register new user
 * @access Public
 */


router.post('/', expController.createExp)

/**
* @route GET all exp
* @description Register new user
* @access Public
*/
router.get('/', expController.getAllExp);




/**
* @route GET an exp with ID
* @description Register new user 
* @access Public
*/
router.get('/:id', expController.getExp);


/**
* @route PUT an exp
* @description edit an exp
* @access Public
*/
router.put('/', expController.updateExp)
/**
* @route Delete an exp
* @description delete an user
* @access Public
*/
router.delete('/', expController.deleteExp)










module.exports = router;
