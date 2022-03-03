import mongoose, {Schema} from 'mongoose';

const fileArraySchema =new Schema({
    fileName:String,
    ETag:String,
    fileLocation:String,
    key:String,
})

const timeline_data = new Schema({
    comment:String,
    next_contact_date:String,
    isReplied:Boolean,
    scheduledOn:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    interview_action:{
        type:Schema.Types.ObjectId,
        ref:'InterviewAction'
    },
    secondary_userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    interview_score:{
        type:Schema.Types.ObjectId,
        ref:'InterviewScore'
    },
    action:{
        type:String,
        enum:['scheduled','completed']
    },
    fileArray:[fileArraySchema],
    
},{timestamps:true})

    

const IntervewTimeline = new Schema({
    leadId:{
        type:Schema.Types.ObjectId,
        ref:'Lead'
        // type:String
    },
    timeline_data:[timeline_data]
},{timestamps:true})



export default mongoose.model('InterviewTimeline',IntervewTimeline,'InterviewTimeline')