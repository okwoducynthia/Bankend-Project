const express = require("express");
const { SignUpUser, LoginUser, GetAllUser, DeleteUser, UpdateSingleUser, GetSingleUser } = require("../Controllers/UserController");




const router = express.Router();

router.post("/Signup", SignUpUser);

router.post("/Login", LoginUser);

router.get("/", GetAllUser);
router.get("/:id", GetSingleUser);

router.delete("/:id", DeleteUser);

router.put("/:id", UpdateSingleUser);

module.exports = router;
// export default router
