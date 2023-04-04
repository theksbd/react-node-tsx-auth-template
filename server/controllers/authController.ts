import bcrypt from 'bcrypt';
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../config/CustomAPIError';
import users from '../data';
import {
  createAccessTokenAndAttachToCookie,
  createRefreshTokenAndAttachToCookie,
  verifyRefreshToken
} from '../utils/jwt';

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      throw new CustomAPIError(
        'Please provide all necessary fields!',
        StatusCodes.BAD_REQUEST
      );
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser)
      throw new CustomAPIError(
        'User with this email already exists!',
        StatusCodes.CONFLICT
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({ username, password: hashedPassword, email });

    return res.status(StatusCodes.OK).json({ success: true, users });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomAPIError(
        'Please provide all necessary fields!',
        StatusCodes.BAD_REQUEST
      );
    }

    const foundUser = users.find(user => user.email === email);
    if (!foundUser)
      throw new CustomAPIError('User not found!', StatusCodes.NOT_FOUND);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect)
      throw new CustomAPIError(
        'Wrong email or password!',
        StatusCodes.FORBIDDEN
      );

    const { password: userPassword, ...user } = foundUser;

    createAccessTokenAndAttachToCookie(res, user);
    createRefreshTokenAndAttachToCookie(res, user);

    return res.status(StatusCodes.OK).json({ success: true, ...user });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const refreshAllToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      throw new CustomAPIError(
        'Refresh token is not found! Please login again!',
        StatusCodes.BAD_REQUEST
      );

    /* NOTE: We does not have any databases yet, but when we have, we should check from database first
    if there is any user with this refreshToken. If not, we should throw an error. Below is a pseudo code: */
    //   const foundUser = users.find(user => user.refreshToken === refreshToken);
    //   if (!foundUser)
    //     throw new CustomAPIError('User with this refreshToken is not found!', StatusCodes.NOT_FOUND);

    const decoded = verifyRefreshToken(refreshToken);
    const { username, email } = decoded as {
      username: string;
      email: string;
    };
    // create new accessToken, refreshToken and send to user
    createAccessTokenAndAttachToCookie(res, { username, email });
    createRefreshTokenAndAttachToCookie(res, { username, email });

    return res.status(StatusCodes.OK).json({ success: true, username, email });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
