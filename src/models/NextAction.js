import mongoose, { Schema } from 'mongoose'

const nextActionSchema = new Schema({
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

export default mongoose.model('NextAction', nextActionSchema)