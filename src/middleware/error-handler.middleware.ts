import { NextFunction, Request, Response } from "express";

//const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  

  // mongo error- email and/or password not provided 
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item: any) => item.message).join(', ');
    customError.statusCode = 400;
  }
  // mongo error - creating duplicate unique property(e.g. email)
  if( err.code && err.code===11000 ) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, pleae choose another value`
    customError.statusCode = 400;
  }
  if(err.name === 'CastError'){
    customError.msg = ` No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  // m
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg})
}
// These if statements were gottten by looking at the full error message of each error type;s

export default errorHandlerMiddleware;
