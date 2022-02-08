import mongoose, { Schema } from 'mongoose'

const interviewactionSchema = new Schema({
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

export default mongoose.model('InterviewAction', interviewactionSchema, 'interviewaction')