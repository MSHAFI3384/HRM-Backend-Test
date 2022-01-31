import mongoose, { Schema } from 'mongoose'

const demographicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Demographic', demographicSchema)