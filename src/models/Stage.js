import mongoose, { Schema } from 'mongoose'

const stageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Stage', stageSchema)