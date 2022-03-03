import models from "../models"
import { MISSING_PARAMETER } from "../utilities/handleError"
import APIError from '../utilities/APIError'
import { editExistingLead } from "./lead/leads"
import { uploadToS3 } from "../hooks/aws"
import { editLead } from "../controllers/LeadController"

export const addInterviewTimeline = (data,res) => new Promise(async (resolve,reject) =>{
    try{
        if(!data) throw new APIError (MISSING_PARAMETER)
        let findId = await models.InterviewTimeline.find({leadId:data.body.leadId}).countDocuments() > 0 ;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',data.files,'++++++++++++++',data.body)
        const fileUploadPayload = []
        const timeline_object = JSON.parse(data.body.timeline_object)
        if(data.files){
            for(let item of data.files){
                let fileLink = await uploadToS3(item)
                let object = {
                    fileName:item.originalname,
                    ETag:fileLink.ETag,
                    fileLocation:fileLink.Location,
                    key:fileLink.key,
                }
                fileUploadPayload.push(object)
            }
            if (fileUploadPayload.length > 0){
                timeline_object['fileArray']= fileUploadPayload
            }
            console.log('timeline_object ===',timeline_object)
        }

        let editLeadPayload={
            body:{
                id:data.body.leadId,
                status:data.body.statusId,
                userId:data.body.userId,
            }
        }

        if(findId){
            // console.log('Update',data.body.timeline_object.action);
            if (timeline_object.action === 'completed'){
                models.InterviewTimeline.findOneAndUpdate({leadId:data.body.leadId},{$push:{timeline_data:timeline_object}})
                .then(async (result)=>{
                    // console.log(data.body.objectId);
                    let statusUpdateResult = await editLead(editLeadPayload,res)
                    let result1 = await models.InterviewTimeline
                    .findOneAndUpdate({leadId:data.body.leadId,"timeline_data._id":data.body.objectId},         // updating a value inside an 
                        {$set:{"timeline_data.$.isReplied":true}}                                               // (object -> Array -> object -> Field) or nested object
                    )
                    resolve(result)
                })
            }
            else{
                let result = await models.InterviewTimeline.findOneAndUpdate({leadId:data.body.leadId},{$push:{timeline_data:timeline_object}})
                if(result){
                    let statusUpdateResult = await editLead(editLeadPayload,res)
                    let result1 = await models.Lead.findOneAndUpdate({_id:data.body.leadId},{$push:{secondary_owners:{userId:timeline_object.secondary_userId}}})
                    // console.log('result1 ====',result1);
                    if(result1){
                        resolve(result)
                    }
                } 
            }
        }
        else{
            console.log('Not Find ID-------------------------------------------------------------------------------------------')
            let payload = {
                leadId:data.body.leadId,
                timeline_data:[
                    timeline_object
                ]
            }
            console.log(payload)
            let result = await new models.InterviewTimeline(payload).save()
            if(result){
                console.log(timeline_object.secondary_userId);
                let leadPayload = {
                    body:{
                        id:data.body.leadId,
                        status:data.body.statusId,
                        userId:timeline_object.secondary_userId,
                        secondary_owners:[
                            {
                                userId:timeline_object.secondary_userId
                            }
                        ]
                    }
                }
                let result1 = await editLead(leadPayload,res)
                if(result1){
                    resolve(result)
                }
            } 
        }
    }
    catch(err){
        console.log('/////////////////',err)
        reject(err)
    }

})

export const listInterviewTimeline = data => new Promise( async (resolve,reject)=>{
    try{
        if(!data) throw new APIError(MISSING_PARAMETER)
        console.log(data.body)
        let populateArray = ['timeline_data.interview_action','timeline_data.secondary_userId','timeline_data.interview_score']
        let result = await models.InterviewTimeline.findOne({leadId:data.body.leadId}).populate(populateArray)
        resolve(result)
    }
    catch(err){
        reject (err)
    }
})





