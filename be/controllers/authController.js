const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signUpController = async (req,res)=>{
    try {
        if(!req.body)return res.status(400).json({
            message:"fields are empty"
        });
        const { email, password } = req.body;
        if(!email||!password)return res.status(400).json({
            message:"one of the field is missing"
        });

        const currentUserWithEmail = await User.findOne({email});
        
        if(currentUserWithEmail)return res.status(400).json({
            message:'User with this email already exists'
        });
        
        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
          email,
          password:hashedPwd, 
        });
        // isOtpVerified:isEmailVerified
    
        return res.status(201).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
}


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const currentUserWithEmail = await User.findOne({ email });

    if (!currentUserWithEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      currentUserWithEmail.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: currentUserWithEmail._id,
        email: currentUserWithEmail.email,
        // role: currentUserWithEmail.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
   
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: currentUserWithEmail._id,
        name: currentUserWithEmail.name,
        email: currentUserWithEmail.email,
        // role: currentUserWithEmail.role,
        mobile:currentUserWithEmail.mobile,
        address:currentUserWithEmail.address,
        // profilePhoto:currentUserWithEmail.profilePhoto
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const settingsController = async (req, res) => {
    try {
        const {
            email,
            name,
            mobile,
            password,
            address,
        } = req.body;

        if (!email || !name || !mobile || !password || !address) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Hash the received password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get the only existing user
        const existingUser = await User.findOne();

        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }

        // Replace all user data
        existingUser.email = email;
        existingUser.name = name;
        existingUser.mobile = mobile;
        existingUser.password = hashedPassword;
        existingUser.address = address;

        await existingUser.save();

        // Remove password from response
        const userResponse = existingUser.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: "User data updated successfully",
            user: userResponse,
        });

    } catch (error) {
        console.error("Settings controller error:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    signUpController,
    loginController,
    settingsController
};
