import mongoose, { Schema } from 'mongoose'

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Source',
        required: true
    },
    subSourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Subsource'
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Campaign', campaignSchema)