import express from 'express'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { verifyToken } from '../utilities/auth'
import { addLeadService, listAllLeadsService, leadsDetailsService, editExistingLead, leadsDetailsServiceByDynamicPopulate, leadtest, processCsv, countLeadService } from '../services/lead/leads'
import { handle_server_error, USER_ALREADY_EXIST } from '../utilities/handleError'
import { checkPaginationOrCount } from '../hooks/query'
import { apiCreateMultipleActivity,apiCreateMultipleActivityUsingEdit } from '../controllers/ActivityController'
import {editLead} from '../controllers/LeadController'
import multer from 'multer';
import APIError from '../utilities/APIError'

const router = express.Router()
const multeroptions = multer();

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

router.post('/count',verifyToken, async(req,res)=>{
    try{
        let count = await countLeadService(req);
        res.status(200).json(count)
    }catch(err){
        let error = await handle_server_error(err,req);
        res.status(error.code).json(error)
    }
})

router.post(['/', '/list'], verifyToken, checkPaginationOrCount, async (req, res) => {
    try {
        const allLeads = await listAllLeadsService(req.query,req.body)
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

        let uniqueEmail = await mongoose.models.Lead.find({email:lead.email})
        let uniquePhone = await mongoose.models.Lead.find({phone_number:lead.phone_number})

        if (uniqueEmail.length>0 || uniquePhone.length>0){
            console.log('"Lead Already Exist"')
            throw new APIError(USER_ALREADY_EXIST)
        }else{
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
            
        }

    } catch (err) {
        console.log(err)
        let error = await handle_server_error(err, req)
        return res.status(error.code).json(error)
    }
})


router.post('/edit', verifyToken, multeroptions.any("uploadFile"), editLead)


export default router