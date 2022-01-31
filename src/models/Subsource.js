import mongoose, { Schema } from 'mongoose'

const subSource = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Source',
    },
    labelText: {
        type: String,
        required: [true, 'Label is required']
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Subsource', subSource)