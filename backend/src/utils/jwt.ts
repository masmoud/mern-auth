import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { BadRequestError } from "./errors";

// Payload JWT
interface TokenPayload extends JwtPayload {
  userId: string;
}

// Common signature options
const commonSignOptions: SignOptions = {
  algorithm: "HS256",
  issuer: "mern-auth-api",
};

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    ...commonSignOptions,
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET as Secret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequestError("Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequestError("Invalid token");
    }
    throw error;
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  return jwt.decode(token) as TokenPayload | null;
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = {
    ...commonSignOptions,
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET as Secret, options);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequestError("Refresh token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequestError("Invalid refresh token");
    }
    throw error;
  }
};

export const decodeRefreshToken = (token: string): TokenPayload | null => {
  return jwt.decode(token) as TokenPayload | null;
};
