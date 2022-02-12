import mongoose, {Schema} from 'mongoose';

// const IntervewTimeline = new Schema({
//     leadId:{
//         type:Schema.Types.ObjectId,
//         ref:'Lead'
//     },
//     timelineData:[{
//         userId:{
//             type:Schema.Types.ObjectId,
//             ref:'User'
//         },
//         interview_action:{
//             type:Schema.Types.ObjectId,
//             ref:'InterviewAction'
//         },
//         interview_score:{
//             type:Schema.Types.ObjectId,
//             ref:'InterviewScore'
//         },
//         action:String,
//         isReplied:Boolean,
//     }]
// },{timestamps:true})

const IntervewTimeline = new Schema({
    leadId:{
        type:String,
    },
    timelineData:[{
        userId:{
            type:String,
        }
    }]
},{timestamps:true})

export default mongoose.model('InterviewTimeline',IntervewTimeline,'InterviewTimeline')