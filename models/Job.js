import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: [true, 'Please provide sending location '],
      maxlength: 50,
    },
    to: {
      type: String,
      required: [true, 'Please provide receiving destination'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['standard', 'weapons', 'animals', 'refrigood'],
      default: 'standard',
    },
    jobType: {
      type: String,
      string: ['standard', 'medium', 'large'],
      default: 'standard',
    },
    sender: {
      type: String,
      default: '',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
