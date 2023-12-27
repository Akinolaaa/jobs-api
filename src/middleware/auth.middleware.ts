import { NextFunction, Request } from "express";

import User from '../models/User';
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

export interface IUserMiddleware {
  userId: string,
  name: string,
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
     // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    // Another way is to get the user with id from the db without the password and pass it to req.user
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}


module.exports = authMiddleware;