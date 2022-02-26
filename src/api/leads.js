import express from 'express'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { verifyToken } from '../utilities/auth'
import { addLeadService, listAllLeadsService, leadsDetailsService, editExistingLead, leadsDetailsServiceByDynamicPopulate, leadtest, processCsv } from '../services/lead/leads'
import { handle_server_error } from '../utilities/handleError'
import { checkPaginationOrCount } from '../hooks/query'
import { apiCreateMultipleActivity,apiCreateMultipleActivityUsingEdit } from '../controllers/ActivityController'


const router = express.Router()

router.post('/addCsv',async (req,res)=>{
    try{
        const result = await processCsv(req)
        res.status(200).json(result)
    }
    catch(err){
        // console.log("xyz",err);
        let error = await handle_server_error(err,req)
        // console.log('abc',error);
        res.status(error.code).json(error)
    }
})

router.post(['/test'], async (req, res) => {
    try {
        const testLead = await leadtest(req)
        console.log(testLead);
        return res.status(200).json(testLead)
    }
    catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
})

router.get(['/', '/list'], verifyToken, checkPaginationOrCount, async (req, res) => {
    try {
        const allLeads = await listAllLeadsService(req.query)
        return res.status(200).json(allLeads)
    }
    catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
})


router.post('/details', verifyToken, async (req, res) => {
    try {
        //first find the record and then dynamically populate
        await leadsDetailsService(req.body)
            .then(async (response) => {
                let lead = response._doc;
                let keyCheck = ['source','location','designation','status'];
                let keysToBePopulated = [];
                keyCheck.forEach((element, index, array) => {
                    Object.keys(lead).forEach(key => {
                        if (element == key) {
                            if (mongoose.Types.ObjectId.isValid(lead[key])) { keysToBePopulated.push(key) }
                        }
                    });
                })
                const leadsDetails = await leadsDetailsServiceByDynamicPopulate(req.body, keysToBePopulated)
                res.status(200).send(leadsDetails)
            })
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
})


router.post('/add', verifyToken, async (req, res) => {
    try {
        let lead = req.body;

        //For digital leads when status is empty assign the value New for Status
        if (!lead['status']) {
            let result = await mongoose.models.Status.findOne({name:'New'}).select('_id')
            lead['status'] = result._id 
            // lead['status'] = mongoose.mongo.ObjectId('61e7e28596f4e2283c6316f5');
        }
        await addLeadService(req.body).then(async (response) => {
            return response;
        }).then(async (updatedLead) => {
            console.log("Create Activity Modules from New Lead",updatedLead);
            let activity_payload = [];
            let lead_created = ["email", "phone"];
            let sources = ["source"];

            //do all the activity process here
            //------------------lead_created activity------------------------
            let activity_1 = {
                'action': "lead_created",
                // 'userId': userId,
                'email':updatedLead.email,
                'phone_number':updatedLead.phone_number
            };

            activity_payload.push(activity_1);
            //------------------lead_created activity------------------------

            // //------------------project_enquiry activity------------------------
            // let activity_2 = {
            //     'action': "project_enquiry",
            //     'leadId': updatedLead["_id"],
            //     'userId': userId,
            //     'createdAt': new Date()
            // };
            // if (updatedLead.projects.length > 0) {
            //     let project = updatedLead["projects"];
            //     activity_2['project'] = project.slice(-1).pop()
            //     activity_payload.push(activity_2);
            // }
            // //------------------project_enquiry activity------------------------

            //------------------source activity------------------------
            let activity_3 = {
                'action': "source",
                'source':updatedLead.source
                
            };
            activity_payload.push(activity_3);
            //------------------source activity------------------------

            //-----------------------assign activity------------------------
            if(updatedLead.contact_owner){
                let activity_4 = {
                    action:'assignedTo',
                    'assignedTo':updatedLead.contact_owner
                };
                activity_payload.push(activity_4);
            }
            //----------------------assign activity------------------------


            let payload = {
                leadId:updatedLead._id,
                timeline:activity_payload
            }
            let activityResponse = await apiCreateMultipleActivity(payload);
            // let response = { updatedLead, activityResponse }
            // console.log("resPonse", activity_payload);
            console.log("resPonse", activityResponse);
            res.status(200).send(updatedLead)
        })
    } catch (err) {
        let error = await handle_server_error(err, req)
        return res.status(error.code).json(error)
    }
})


router.post('/edit', verifyToken, async (req, res) => {
    try {
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
                console.log('****************activityResponse*********************',activityResponse)
                response = { updatedLead, activityResponse }
            }

            console.log("Updated lead with activity", activity_payload);
            res.status(200).send(response)
           
        })
        //res.status(200).send(updatedLead)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


export default router