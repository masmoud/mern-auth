import User from "../models/user.model";

export const register = async (name: string, email: string, password: string) => {
  const user = await User.create({ name, email, password });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return {
      success: false,
      message: "Invalid password",
    };
  }
  return {
    success: true,
    message: "Login successful",
  };
};
