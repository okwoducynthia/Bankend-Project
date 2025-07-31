const express = require("express");
const { GetAllTask, GetSingleTask, CreateTask, DeleteTask, UpdateTask } = require("../Controllers/TaskController");

const router = express.Router()
router.get("/", GetAllTask);
router.get("/:id", GetSingleTask);

router.post("/", CreateTask);

router.delete("/:id", DeleteTask);

router.put("/:id", UpdateTask);

// router.get("/:id", (req, res)=>{
//     res.json({message: "Hello Cynthia"});
//   });


  
module.exports = router
// export default router