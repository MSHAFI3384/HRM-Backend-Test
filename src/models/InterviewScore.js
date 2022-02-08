import mongoose, { Schema } from 'mongoose'

const interviewscoreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('InterviewScore', interviewscoreSchema, 'interviewscore')