import express from 'express';

const router = express.Router();
import {
  getAllJobs, getJob, createJob,
  updateJob,
  deleteJob 
} from '../controllers/jobs.controller';

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;