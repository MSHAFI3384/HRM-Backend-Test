import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    projectType: {
        type: Schema.Types.ObjectId,
        ref: 'ProjecType',
        required: true,
    },
    projectStatus: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectStatus',
        required: true,
    },
    units: {
        type: String,
        required: true
    },
    stocks: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)