import mongoose, { Schema } from 'mongoose'

const mediumSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    channelId: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Medium', mediumSchema)