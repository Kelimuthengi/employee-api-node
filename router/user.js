const express = require("express")
const router = express.Router();
const { addnewuser, login } = require("../controllers/user");

router.post("/signup", addnewuser);
router.post("/login", login);
module.exports = router