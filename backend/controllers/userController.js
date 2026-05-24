import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// CREATE TOKEN

const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// LOGIN USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,

      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// REGISTER USER

const registerUser = async (req, res) => {
  const {
    name,
    username,
    email,
    phone,
    password,
    avatar,
  } = req.body;

  try {
    // normalize username

    const normalizedUsername =
      username.toLowerCase();

    // check existing email

    const exists = await userModel.findOne({
      email,
    });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // check existing username

    const usernameExists =
      await userModel.findOne({
        username: normalizedUsername,
      });

    if (usernameExists) {
      return res.json({
        success: false,
        message: "Username already taken",
      });
    }

    // validate email

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validate password

    if (password.length < 8) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters",
      });
    }

    // validate phone

    if (!validator.isMobilePhone(phone, "any")) {
      return res.json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(
      Number(process.env.SALT),
    );

    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );

    // create user

    const newUser = new userModel({
      name,
      username: normalizedUsername,
      email,
      phone,
      password: hashedPassword,
      avatar,
    });

    const user = await newUser.save();

    // create token

    const token = createToken(user._id);

    // response

    res.json({
      success: true,
      token,

      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { loginUser, registerUser };