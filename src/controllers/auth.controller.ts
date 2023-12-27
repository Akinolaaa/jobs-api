import { Request, Response } from 'express'
import { IUserMiddleware } from '../middleware/auth.middleware';
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

declare global {
    namespace Express {
      interface Request {
        user: IUserMiddleware;
      }
    }
  }
export const register = async (req: Request, res: Response) => {
  // const { name, email, password } = req.body;
  // if(!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password");
  // }

  // Mongoose is currently doing all the validations
  // Password hashing is also being done on mongoose pre('save') middleware
  const user = await User.create({...req.body})
  const token = user.createJWT();        // Instance method on schema
  res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token });
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({email})
  if (!user) {
    throw new UnauthenticatedError('Invalid Creadentials')
  }
  // compare password
  const correctPassword = await user.comparePassword(password);
  //console.log(correctPassword);
  if (!correctPassword) {
    throw new UnauthenticatedError('Invalid Creadentials')
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: {name: user.name}, token })
}