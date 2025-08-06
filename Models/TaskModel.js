const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const TaskSchema = mongoose.Schema(
  {
    // lastName:{
    //   type:String,
    //   required:[true, "Please this field is required"],
    //   unique: true,
    //   default: "chris" //this means that if a user does  not fill this field the default would be chris. note that when you have a default value require should be false
    // },

    // projectImg:[{
    //   pix:{
    //     type: string
    //   }
    // }],
    //
    // to include an image OR

    // projectImg: [""]

    title: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [5, "Minimum lenght should be more than 5 letter words"],
      maxLength: [1000, "Maximum length should not exceed 1000 words"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectLink: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    Status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
