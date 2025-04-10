import User from "../models/user.model";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import { logger } from "../utils/logger";

const register = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "user" = "user"
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("User already exists");
  }
  const newUser = new User({ name, email, password, role });
  try {
    await newUser.save();
  } catch (error) {
    logger.error(`Erreur lors de la création de l'utilisateur: ${error}`);
    throw error;
  }

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Invalid password");
  }

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return {
    success: true,
    message: "Login successful",
    tokens: {
      accessToken,
      refreshToken,
    },
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshToken = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Générer un nouvel access token
  const accessToken = generateToken(user._id);

  return {
    success: true,
    message: "Token refreshed successfully",
    accessToken,
  };
};

export default { register, login, refreshToken };
