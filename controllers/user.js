const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonToken = require("jsonwebtoken");
require("dotenv").config();

const addnewuser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "please add name, email or password" });
    }

    // hash password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUSER = { username, email, password: hashedPassword };

    const user = await User.create({ ...newUSER });

    const token = await jsonToken.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(200).json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "key in email and password!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          success: fasle,
          message: "un autorized login please create an account!",
        });
    }

    const isPassswordTrue = await user.comparePassword(password);

    if (!isPassswordTrue) {
      return res
        .status(401)
        .json({ message: "invalid credentials please check your passwords" });
    }

    const token = await jsonToken.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(200).json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addnewuser, login };
