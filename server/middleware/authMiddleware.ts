import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../config/CustomAPIError';
import { RequestWithUser } from '../config/Interface';
import {
  createAccessTokenAndAttachToCookie,
  verifyAccessToken,
  verifyRefreshToken
} from '../utils/jwt';

export const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    // If the accessToken still does not expire, then we don't need to refresh it
    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);
      const { username, email } = decoded as {
        username: string;
        email: string;
      };
      req.user = { username, email };
      return next();
    }

    // If the accessToken expires, then we use the refreshToken to generate a new accessToken

    // 1. First, check if the refreshToken has expired or not
    if (!refreshToken)
      throw new CustomAPIError(
        'Refresh token is expired! Please login again!',
        StatusCodes.UNAUTHORIZED
      );
    /* ------------------ We need a database to check if the user with this refreshToken exists ------------------ */
    /* ------------------ So now we skip this step as we don't have the database yet ------------------ */
    /* ------------------ Below is a pseudo code ------------------ */
    /*
    const foundUser = users.find(user => user.refreshToken === refreshToken);
    if (!foundUser)
      throw new CustomAPIError('User with this refreshToken is not found!', StatusCodes.UNAUTHORIZED);
    */

    const decoded = verifyRefreshToken(refreshToken);
    const { username, email } = decoded as {
      username: string;
      email: string;
    };

    // 2. If the refreshToken is still valid, then we generate a new accessToken and attach it to the cookie
    createAccessTokenAndAttachToCookie(res, { username, email });
    req.user = { username, email };
    next();
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: error.message });
  }
};

export const verifyTokenAndUserAuthorization = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    next();
    // NOTE: This is just a pseudo code to show how we can use the req.user to check if the user is authorized to do something, we don't have the database yet, so we skip this step
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    //   next();
    // } else {
    //   res.status(403).json("You're not allowed to access this route!");
    // }
  });
};

export const verifyTokenAndAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    next();
    // NOTE: Pseudo code to show how we can use the req.user to check if the user is admin or not, we don't have the database yet, so we skip this step
    // if (req.user.isAdmin) {
    //   next();
    // } else {
    //   res.status(403).json("You're not allowed to access this route!");
    // }
  });
};
