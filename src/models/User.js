import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is already exists']
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true
    },
    location: {
        type:Schema.Types.ObjectId,
        ref:'Location'
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    },
    profileImage: {
        type: String,
    }
}, { timestamps: true })


export default mongoose.model('User', userSchema)
