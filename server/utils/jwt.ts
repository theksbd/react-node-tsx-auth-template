import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_KEY as string);
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY as string);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_KEY as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_KEY as string);
};

export const attachTokenToCookie = (
  res: Response,
  key: string,
  token: string,
  expires: Date = new Date(Date.now() + 60 * 1000) // 1 minute
) => {
  res.cookie(key, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires
  });
};

export const createAccessTokenAndAttachToCookie = (
  res: Response,
  payload: any
) => {
  const accessToken = generateAccessToken(payload);
  // const thirtyMinutes = new Date(Date.now() + 30 * 60 * 1000);
  // attachTokenToCookie(res, 'accessToken', accessToken, thirtyMinutes);
  const tenSeconds = new Date(Date.now() + 10 * 1000); // For testing purpose, we set 10 seconds instead of 30 minutes
  attachTokenToCookie(res, 'accessToken', accessToken, tenSeconds);
};

export const createRefreshTokenAndAttachToCookie = (
  res: Response,
  payload: any
) => {
  const refreshToken = generateRefreshToken(payload);
  const oneMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  attachTokenToCookie(res, 'refreshToken', refreshToken, oneMonth);
};
