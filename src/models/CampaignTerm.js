import mongoose, { Schema } from 'mongoose'

const capaignTermSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('CampaignTerm', capaignTermSchema)