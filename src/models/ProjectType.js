import mongoose, { Schema } from 'mongoose'

const projectTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('ProjecType', projectTypeSchema, 'projectType')