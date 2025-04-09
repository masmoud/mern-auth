import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN, // 15 minutes in seconds
  };
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET as Secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const generateRefreshToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: "1d", // 1 day in seconds
  };
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET as Secret, options);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
};

export const decodeRefreshToken = (token: string) => {
  return jwt.decode(token);
};
