import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body; // password -> ujnrekidk475638
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All Fields Are Require",
      });
    }
    // finding user ki with this email id se register to nahi
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "this email id already register",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.rawHeaders);
    res.set("channelName", "patelmernstack");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email Or Password",
      });
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);

    if (!ispasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
      });
  } catch (error) {
    console.log(error.message);
  }
};

// export const Logout = (req, res) => {
//   try {
//     return res.status(200).cookie("tooken", "", { maxAge: 0 }).json({
//       success: true,
//       message: "User Logout Successfully",
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// gpt
export const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, // Ensures the cookie is inaccessible via client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      sameSite: "strict", // Protects against CSRF attacks
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
