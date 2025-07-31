const SignUpUsers = async (req, res) => {

  const {firstName, lastName, email, phoneNumber, password, isAdmin} = req.body
  try {

    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const userExist = await UserModel.findOne({
      email
    })
    if (userExist) {
      return res.status(405).json({
        message: "User Already Exist"
      })
    }

    /// TO CREATE A NEW USER
    const createNewUser = await UserModel.create({
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password
    })

    /// SAVING EVERYTHING IN THE REQ.BODY TO THE DB
    const userResult = await createNewUser.save()

    ///WHERE AM RETURNING THE DATA IF SUCCESSFUL
    res.status(200).json({
      _id: userResult._id,
      firstName: userResult.firstName,
      lastName: userResult.lastName,
      email: userResult.email,
      phoneNumber: userResult.phoneNumber,
      password: userResult.password,
      isAdmin: userResult.isAdmin
    });
  } 
  
  catch (error) {
    res.status(404).json({
      message: "Failed to fetch data"
    })
  }
}

module.exports = {
  SignUpUsers,
}