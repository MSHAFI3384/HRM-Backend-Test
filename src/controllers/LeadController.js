import express from 'express'
import mongoose from 'mongoose'
import { editExistingLead} from '../services/lead/leads'
import { handle_server_error } from '../utilities/handleError'
import { apiCreateMultipleActivity,apiCreateMultipleActivityUsingEdit } from '../controllers/ActivityController'
import { uploadToS3 } from '../hooks/aws'

export const editLead = async (req, res) => {
    try {
        
        if(req.files.length>0){
            let item = req.files[0]
            let fileLink = await uploadToS3(item)
            let object = {
                fileName:item.originalname,
                ETag:fileLink.ETag,
                fileLocation:fileLink.Location,
                key:fileLink.key,
            }
            req.body['resume'] = object
            console.log('req.body ===',req.body)
        }

        let lead = req.body, params = req.query;
        let comment = null, userId = null, statusTo = null, statusFrom = null, contact_owner = null;
        console.log('updated lead in edit lead ==',lead);
 

        if (lead.comment) {
            comment = lead.comment;
            delete lead.comment;
        }
        if (lead.userId) {
            userId = lead.userId;
            delete lead.userId;
        }
        if (lead.status){
            statusTo = lead.status
            statusFrom = await mongoose.models.Lead.findById(lead.id).select('status')
            console.log('Status is here',statusFrom,statusTo);
        }
        if(lead.contact_owner){
            contact_owner = lead.contact_owner
        }
 
        const updatedLead = await editExistingLead(lead).then(async (updatedLead) => {
            console.log("updated lead in edit updatedLead ==", updatedLead);
            let activity_payload = []
            let response = {}
 
            // // do all the activity process here
            // // ------------------comment activity------------------------
            if (comment) {
                let comment_activity = {
                    'action': "comment",
                    'userId': userId,
                    'comment': comment,
                };
                activity_payload.push(comment_activity);
            }
            // // ------------------comment activity------------------------
 
            // // ------------------status change activity------------------
            if(statusTo){
                let status_activity = {
                    'action':'status_change',
                    'userId':userId,
                    'leadStatusFrom':statusFrom?statusFrom.status:'',
                    'leadStatusTo':statusTo,
                }
                activity_payload.push(status_activity)
            }
            //---------------------status change activity-------------------
            
            //---------------------Contact Owner activity-------------------
            if(contact_owner){
                let activity_4 = {
                    action:'assignedTo',
                    'assignedTo':updatedLead.contact_owner
                };
                activity_payload.push(activity_4);
            }
            //---------------------Contact Owner activity-------------------
               
                
            if(activity_payload.length > 0){
                let final_payload = {
                    'leadId':updatedLead._id,
                    'activity_payload':activity_payload
                }
                let activityResponse = await apiCreateMultipleActivityUsingEdit(final_payload);
                // console.log('****************activityResponse*********************',activityResponse)
                response = { updatedLead, activityResponse }
            }
 
            console.log("Updated lead with activity", response);
            res.status(200).send(response)
           
        })
        // res.status(200).send(updatedLead)
    } catch (err) {
        console.log('Lead Controller Error////////////////////////////////////',err)
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
 }

// export const processCsv = data => new Promise((resolve,reject)=>{

//     if(!data) throw new APIError(MISSING_PARAMETER)
//     if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
//     if(!data.body.csvReferenceArray) throw new APIError(MISSING_PARAMETER)

//     let csvArray = data.body.csvArray
//     let csvReferenceArray = data.body.csvReferenceArray

//     try{
        
//         // let objectTypes =['location','status','designation','source']
//         let objectTypes =[
//             {name:'location',modelName:'Location'},
//             {name:'status',modelName:'Status'},
//             {name:'designation', modelName:'Designation'},
//             {name:'source',modelName:'Source'},
//         ]
//         let finalArray = []
//         csvArray.map((item,index)=>{
//             // let leadObject = {}
//             // let promises = csvReferenceArray.map((bItem,bIndex)=>{
//             csvReferenceArray.map((bItem,bIndex)=>{
//             if(bItem.name === 'location' || bItem.name==='designation' || bItem.name==='source' || bItem.name==='status'){
//                     let modelName = bItem.name === 'location' ? 'Location' :
//                         bItem.name === 'source' ? 'Source' : 
//                         bItem.name === 'designation' ? 'Designation' :
//                         bItem.name === 'status' ? 'Status' : null

//                         // let result = await processModel(bItem.name,modelName,item[bItem.value.csvFieldId])
//                         // leadObject[bItem.name] = result? result : null
//                         // console.log(result)
//                         // console.log(leadObject)
//                         if(item[bItem.value.csvFieldId]){
//                             let result = models[modelName].findOne({name:item[bItem.value.csvFieldId]})
//                                 console.log(result);
//                                 leadObject[bItem.name] = result._id ? result._id : ""
//                                 console.log(leadObject);
//                             }
//                         else{
//                             leadObject[bItem.name] = null
//                         }
//                     }
//                     else{
//                         leadObject[bItem.name] = bItem.value ? item[bItem.value.csvFieldId] : ""
//                         // console.log('|||||||||||',leadObject);
//                 }
//                 // return leadObject
                
//             })
//             // await Promise.all(promises).then((finalResult)=>{
//             //     console.log('{}{}{}{}}{}{}}{}{}{}{}{}',finalResult)
//             // })
//             console.log('/////////////////////////////',leadObject)
//             finalArray.push(leadObject)
//             leadObject={}
//         })
//         // gconsole.log(finalArray);
//         // finalArray.splice(0,1);

//         // models.Lead.insertMany(finalArray,{ordered:true})
//         // .then(data => {
//         //     resolve(data);
//         // })
//         // .catch(err => {
//         //     reject(err);
//         // });
        
//         resolve(finalArray)
//     }
        
    
        
//     catch(err) {
//         reject(err)
//     }


// })