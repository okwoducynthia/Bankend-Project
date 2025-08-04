const express = require("express");
const {SignupUser, Login} = require("../Controllers/UserController");



const router = express.Router();

router.post("/Signup", SignupUser);

router.post("/Login", Login);

module.exports = router;
// export default router
