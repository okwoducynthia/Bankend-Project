const TaskModel = require("../Models/TaskModel");


const GetAllTask = async (req, res) => {
  try {
    const result = await TaskModel.find().sort({createdAt:-1});
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
};

const GetSingleTask = async (req, res) => {
  const { id } = req.params
  try {
    const result = await TaskModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: `Task ${id} not found` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
};

const CreateTask = async (req, res) => {

  const {title, assignedTo, description, startDate, endDate} = req.body
  try {

    /// TO CHECK IF TASK EXIST IN OUR DB UNDER TASK COLLECTION
    const projectExist = await TaskModel.findOne({title, assignedTo})
    if (projectExist) {
      return res.status(405).json({
        message: "Task already Assigned to this user"
      })
    }

    /// TO CREATE A NEW TASK
    const creatNewTask = await TaskModel.create({
      title, assignedTo, description, startDate, endDate
    })

    /// SAVING EVERYTHING IN THE REQ.BODY TO THE DB
    const taskResult = await creatNewTask.save()

    ///WHERE AM RETURNING THE DATA IF SUCCESSFUL
    // res.status(200).json(taskResult); 
    // OR
    ///WHERE AM RETURNING THE DATA IF SUCCESSFUL
    res.status(200).json({
      _id: taskResult._id,
      title: taskResult.title,
      assignedTo: taskResult.assignedTo,
      description: taskResult.description,
      startDate: taskResult.startDate,
      endDate: taskResult.endDate
    });
  } 
  
  catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
}

const DeleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const result = await TaskModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: `Task ${id} not found` });
    } else {
      res.status(200).json({
        message: `Task ID deleted successfully`
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
};

const UpdateTask = async (req, res) => {
  const { id } = req.params
  const { title, assignedTo, description, startDate, endDate, Status, isCompleted, projectLink } = req.body
  try {
    const result = await TaskModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: `Task ${id} not found` });
    } else {
      result.title = title || result.title
      result.assignedTo = assignedTo || result.assignedTo
      result.description = description || result.description
      result.startDate = startDate || result.startDate
      result.endDate = endDate || result.endDate
      result.isCompleted = isCompleted || result.isCompleted
      result.projectLink = projectLink || result.projectLink
      result.Status = Status || result.Status

      await result.save()
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
};


module.exports = {
  GetAllTask,
  GetSingleTask,
  CreateTask,
  DeleteTask,
  UpdateTask,
}