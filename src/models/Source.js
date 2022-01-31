import mongoose, { Schema } from 'mongoose'

const sourceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mediumId: {
        type: Schema.Types.ObjectId,
        ref: 'Medium',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
}, { timestamps: true })

export default mongoose.model('Source', sourceSchema)