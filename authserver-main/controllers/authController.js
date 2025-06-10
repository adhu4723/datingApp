// controllers/authController.js
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, gender, city } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      dob,
      gender,
      city,
      profileImage: imageUrl
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token,user });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

const resetLink = `https://adhu4723.github.io/ZenoTrip/?#/?showreset=true?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<a href="${resetLink}">Reset your password</a>`,
  });

  res.json({ message: "Password reset link sent" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  
  const { newPassword } = req.body;
  console.log(newPassword);
  

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};

exports.getuser = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: "user details", users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getuserbyid = async (req, res) => {
    try {
        const userId = req.params.id; // assumes the user ID is passed in the URL as a route parameter
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User details", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
