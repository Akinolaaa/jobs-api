const Job = require('../models/Job');
import { StatusCodes } from 'http-status-codes';
const { BadRequestError, NotFoundError } = require('../errors');
import { Request, Response } from 'express'

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt')
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}


export const getJob = async (req: Request, res: Response) => {
  // Naested destructuring
  const { user:{userId}, params:{id: jobId} } = req;
  const job = await Job.findOne({ userId: jobId , createdBy: userId});
  if(!job) {
    throw new NotFoundError('No  job with this id')
  }
  res.status(StatusCodes.OK).json({ job })
}


export const createJob = async (req: Request, res: Response) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job})
}


export const updateJob = async (req: Request, res: Response) => {
  const { body:{company, position}, user:{userId}, params:{id: jobId} } = req;
  if(company==='' || position==='') {
    throw new BadRequestError('Company or position fields cannot be empty')
  }
  const job = await Job.findOneAndUpdate({userId: jobId, createdBy: userId}, req.body,{
    new: true,
    runValidators: true
  })
  if(!job) {
    throw new NotFoundError(`No job with this id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}
export const deleteJob = async (req: Request, res: Response) => {
  const{ user: { userId }, params:{ id: jobId }} = req;
  const job = await Job.findByIdAndRemove({
    userId: jobId,
    createdBy: userId
  })
  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send('ok')
}

