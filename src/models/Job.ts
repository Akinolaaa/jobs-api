import mongoose, { Schema } from 'mongoose';

export interface IJobInput {
  company: string;
  position: string;
  status: string;
  createdBy: Schema.Types.ObjectId | string,
}

export interface IJobDocument extends IJobInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new mongoose.Schema<IJobDocument>({
  company: {
    type: String,
    required: [true, 'Please provide company and name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,   // tying this to one of the schemas
    ref: 'User',  // the specific schema is User
    required: [true, 'Please provide user']
  }
}, { timestamps: true })

const JobModel = mongoose.model('Job', JobSchema);

export default JobModel;