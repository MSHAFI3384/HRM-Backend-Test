import mongoose, { Schema } from 'mongoose'

const campaignContentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'CampaignTerm',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('CampaignContent', campaignContentSchema)