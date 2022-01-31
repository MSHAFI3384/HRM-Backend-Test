import mongoose, { Schema } from 'mongoose'


const leadSchema = new Schema({
    application_id: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    contact_owner: String,
    secondary_owners: String,
    is_assigned: String,
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    alternate_email: {
        type: String,
        required: true,
    },
    alternate_phone: {
        type: String,
        required: true,
    },
    designation: {
        type: Schema.Types.ObjectId,
        ref: 'Designation',
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    linkedin_profile: String,
    current_company: String,
    current_experience: String,
    total_experience: String,
    job_status: String,
    notice_period: String,
    current_ctc: String,
    expected_salary: String,
    technical_knowledge: Array,
    change_reason: String,
    language_level: String,
    source: String
}, { timestamps: true })


export default mongoose.model('Lead', leadSchema)
