import mongoose, { Schema } from 'mongoose'
import commentType from './commonTypes/commentType'

const activity_timeline_data = new Schema({
    email: String,
    phone_number: String,
    action: String,
    leadStatusFrom: {
      type:Schema.Types.ObjectId,
      ref:'Status'
    },
    leadStatusTo: {
      type:Schema.Types.ObjectId,
      ref:'Status'
    },
    comment: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    source: {
      type: Schema.Types.ObjectId,
      ref: 'Source',
    },
    assignedTo:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
},{timestamps:true})

const ActivitySchema = Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead'
  },
  timeline:[activity_timeline_data],
}, { timestamps: true })


export default mongoose.model("Activity", ActivitySchema);