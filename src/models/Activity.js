import mongoose, { Schema } from 'mongoose'
import commentType from './commonTypes/commentType'

const ActivitySchema = Schema({
  email: String,
  phone: String,
  action: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handoverBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handoverTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handoverFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  leadStatusFrom: String,
  leadStatusTo: String,
  leadStageFrom: String,
  leadStageTo: String,
  contactOwner: String,
  isContactOwnerUpdated: { type: Boolean },
  isNextContactDateUpdated: { type: Boolean },
  nextContactDate: Date,
  nextContactAction: String,
  nextContactTime: Date,
  description: String,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  comment: String,
}, { timestamps: true })


export default mongoose.model("Activity", ActivitySchema);