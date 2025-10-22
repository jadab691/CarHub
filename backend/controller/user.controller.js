import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

//signup

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });

    await createUser.save();
    return res.status(201).json({ message: "User created successfully" , user:{
        _id: createUser._id,
        fullname: createUser.fullname,
        email: createUser.email
    }})
  } catch(error) {
    console.error("Signup error details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password , user.password);
    if (!user || !isMatch){
        return res.status(400).json({message: "Invalid User or Password"});
    }else{
        return res.status(200).json({message: "Login Successful" , user:{
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }});
    }

  } catch (error) {
    console.error("Login error details:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
