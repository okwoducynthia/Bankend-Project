const express = require("express");
const { SignUpUsers, Login } = require("../Controllers/UserController");



const router = express.Router();

router.post("/Signup", SignUpUsers);

router.post("/Login", Login);

module.exports = router;
// export default router
