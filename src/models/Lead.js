import mongoose, { Schema } from 'mongoose'

const resumeSchema = new Schema({
    fileName:String,
    ETag:String,
    fileLocation:String,
    key:String,
})


const leadSchema = new Schema({
    resume:resumeSchema,
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    alternate_email: {
        type: String,
     },
    alternate_phone: {
        type: String,
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
    source: {
        type:Schema.Types.ObjectId,
        ref:'Source',
        required:true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        // required: true
    },
    interview_action:{
        type:Schema.Types.ObjectId,
        ref:'InterviewAction'
    },
    interview_score:{
        type:Schema.Types.ObjectId,
        ref:'InterviewScore'
    },
    contact_owner: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    secondary_owners: [
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:'User',
            }
        }
    ],
    is_assigned: String,
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
}, { timestamps: true })


export default mongoose.model('Lead', leadSchema)
