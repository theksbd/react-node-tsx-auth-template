import { RequestWithUser } from '../config/Interface';
import { RequestHandler, Response } from 'express';
import users from '../data';

export const getAllUsers: RequestHandler = (
  req: RequestWithUser,
  res: Response
) => {
  console.log(req.user);
  return res.status(200).json(users);
};
