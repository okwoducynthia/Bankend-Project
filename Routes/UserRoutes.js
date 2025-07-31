const express = require("express");
const { SignUpUsers } = require("../Controllers/UserController");



const router = express.Router();

router.post("/", SignUpUsers);

module.exports = router;
// export default router
