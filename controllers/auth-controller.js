import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import gravatar from "gravatar";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(
      409,
      "Email In Use: The provided email address is already associated with an existing account. If you already have an account, please log in."
    );
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    message:
      "Congratulations! Your registration was successful. You can now sign in with your new account.",
    user: {
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

const signIn = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(
      401,
      "Authentication Failed: Incorrect login or password. Please double-check your credentials and try again."
    );
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(
      401,
      "Authentication Failed: Incorrect login or password. Please double-check your credentials and try again"
    );
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout Successful: You have been successfully logged out.",
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
};
