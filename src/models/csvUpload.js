import mongoose , {Schema} from 'mongoose'

const csvUploadSchema = new Schema({
    currentFile:{
        type:Array
    },
    referenceFile:{
        type:Array
    }
})

export default mongoose.model('csvUpload',csvUploadSchema,)