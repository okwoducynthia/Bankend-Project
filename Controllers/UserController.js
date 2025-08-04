const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs")


const SignupUser = async (req, res) => {

    const {firstName, lastName, email, phoneNumber, password} = req.body;
    try {

        // === To check if task exist in the DB under task collection ===
        const phoneExist = await userModel.findOne({email});
        if(phoneExist){
            res.status(405).json({
                message: "email already exist"
            })
        };
        if(password.length <= 5){
            res.status(405).json({
                message: "password too short"
            })
        };

        //  === To create new task ===
        const createNewUser = new userModel ({
           firstName, lastName, phoneNumber, email, password
        });

        // === To save everything in the req.body to the DB ===
        const userResult = await createNewUser.save();


        // === To return data if successful ===
        // res.status(200).json(taskResult)

        // ** Alternative to the above **
        res.status(200).json({
            _id: userResult._id,
           firstName: userResult.firstName,
            lastName: userResult.lastName,
            phoneNumber: userResult.phoneNumber,
            email: userResult.email,
        });
    } catch (error) {
        res.status(404).json({
            message: "Failed to create user",
        });
    }
}


const Login = async (req, res) => {

    const { email, password } = req.body;
    try {

        // === To check if task exist in the DB under task collection ===
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(405).json({
                message: "user not found"
            })
        };

        const validPassword = await bcrypt.compare(password, userExist.password)
        if(!validPassword){
            return res.status(405).json({
                message: "invalid password"
            })
        };

        // === To return data if successful ===
        res.status(200).json({
            message: "Log in successful",
            _id: userExist._id,
           firstName: userExist.firstName,
            lastName: userExist.lastName,
            phoneNumber: userExist.phoneNumber,
            email: userExist.email,
        });
    } catch (error) {
        res.status(404).json({
            message: "login error",
        });
    }
}

module.exports = {
    SignupUser,
    Login
}