const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs")


const SignUpUsers = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, isAdmin } =
    req.body;
  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const userExist = await UserModel.findOne({
      email,
    });
    if (userExist) {
      return res.status(405).json({
        message: "User Already Exist",
      });
    }

    /// TO CREATE A NEW USER
    const createNewUser = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    /// SAVING EVERYTHING IN THE REQ.BODY TO THE DB
    const userResult = await createNewUser.save();

    ///WHERE AM RETURNING THE DATA IF SUCCESSFUL
    res.status(200).json({
      _id: userResult._id,
      firstName: userResult.firstName,
      lastName: userResult.lastName,
      email: userResult.email,
      phoneNumber: userResult.phoneNumber,
      isAdmin: userResult.isAdmin,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};


const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const userExist = await UserModel.findOne({
      email,
    });
    if (!userExist) {
      return res.status(405).json({
        message: "Invalid User",
      });
    }

    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(406).json({
        message: "Invalid Password"
      })
    }

    ///WHERE AM RETURNING THE DATA IF SUCCESSFUL
    res.status(200).json({
      _id: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
      phoneNumber: userExist.phoneNumber,
      isAdmin: userExist.isAdmin,
    });
  } catch (error) {
    res.status(404).json({
      message: "Login error",
    });
  }
};

module.exports = {
  SignUpUsers,
  Login
};
