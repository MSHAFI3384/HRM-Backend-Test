import models from "../models"
import { MISSING_PARAMETER } from "../utilities/handleError"
import APIError from '../utilities/APIError'
import { editExistingLead } from "./lead/leads"

export const addInterviewTimeline = data => new Promise(async (resolve,reject) =>{
    try{
        if(!data) throw new APIError (MISSING_PARAMETER)
        let findId = await models.InterviewTimeline.find({leadId:data.body.leadId}).countDocuments() > 0 ;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',data.file,'++++++++++++++',data.body)
        // if(findId){
        //     // console.log('Update',data.body.timeline_object.action);
        //     if (data.body.timeline_object.action === 'completed'){
        //         models.InterviewTimeline.findOneAndUpdate({leadId:data.body.leadId},{$push:{timeline_data:data.body.timeline_object}})
        //         .then(async (result)=>{
        //             // console.log(data.body.objectId);
        //             let statusUpdateResult = await editExistingLead({id:data.body.leadId,status:data.body.statusId})
        //             let result1 = await models.InterviewTimeline
        //             .findOneAndUpdate({leadId:data.body.leadId,"timeline_data._id":data.body.objectId},         // updating a value inside an 
        //                 {$set:{"timeline_data.$.isReplied":true}}                                               // (object -> Array -> object -> Field) or nested object
        //             )
        //             resolve(result)
        //         })
        //     }
        //     else{
        //         let result = await models.InterviewTimeline.findOneAndUpdate({leadId:data.body.leadId},{$push:{timeline_data:data.body.timeline_object}})
        //         if(result){
        //             let statusUpdateResult = await editExistingLead({id:data.body.leadId,status:data.body.statusId})
        //             let result1 = await models.Lead.findOneAndUpdate({_id:data.body.leadId},{$push:{secondary_owners:{userId:data.body.timeline_object.secondary_userId}}})
        //             // console.log('result1 ====',result1);
        //             if(result1){
        //                 resolve(result)
        //             }
        //         } 
        //     }
        // }
        // else{
        //     let payload = {
        //         leadId:data.body.leadId,
        //         timeline_data:[
        //             data.body.timeline_object
        //         ]
        //     }
        //     console.log(payload)
        //     let result = await new models.InterviewTimeline(payload).save()
        //     if(result){
        //         console.log(data.body.timeline_object.secondary_userId);
        //         let leadPayload = {
        //             id:data.body.leadId,
        //             status:data.body.statusId,
        //             secondary_owners:[
        //                 {
        //                     userId:data.body.timeline_object.secondary_userId
        //                 }
        //             ]
        //         }
        //         let result1 = await editExistingLead(leadPayload)
        //         if(result1){
        //             resolve(result)
        //         }
        //     } 
        // }
    }
    catch(err){
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





