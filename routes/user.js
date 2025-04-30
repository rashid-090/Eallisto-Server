const express = require("express");
const {submitFormData} = require("../controllers/user/userController")

const router = express.Router();


// Submitting form data to the server
router.post("/form-submit", submitFormData)


module.exports = router;
