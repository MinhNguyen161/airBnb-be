var express = require('express');
var router = express.Router();
const expController = require("../controllers/experience.controllers")
/* GET users listing. */
router.get('/', expController.getExp);


router.post('/', expController.createExp)

module.exports = router;
