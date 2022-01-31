import mongoose, { Schema } from 'mongoose'

const replyType = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String
})

const commentType = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  replies: [{ type: replyType }]
}, { timestamps: true })

export default commentType