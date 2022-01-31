import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    location: {
        type: Array,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    },
    preSaleMangerId: String,
    salesManagerId: String,
    profileImage: {
        type: String,
    }
}, { timestamps: true })


export default mongoose.model('User', userSchema)
