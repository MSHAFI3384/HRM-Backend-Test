import express from 'express'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { verifyToken } from '../utilities/auth'
import { addLeadService, listAllLeadsService, leadsDetailsService, editExistingLead, leadsDetailsServiceByDynamicPopulate, leadtest } from '../services/lead/leads'
import { handle_server_error } from '../utilities/handleError'
import { checkPaginationOrCount } from '../hooks/query'
import { apiCreateMultipleActivity } from '../controllers/ActivityController'

const router = express.Router()

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
                let keyCheck = ['stage', 'status', 'presaleExecutive', 'salesExecutive', 'nextContactAction'];
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
        //let userId = null;
        let lead = req.body;

        // if (lead.userId) {
        //     userId = mongoose.mongo.ObjectId(lead.userId);
        //     delete lead.userId
        // }

        //add application id of uuidv4
        lead['application_id'] = uuidv4();
        //add handover null on add lead
        //lead['handoverRequestedTo'] = null;

        //set assignedTo in add lead data
        // if (lead['presaleExecutive'] && lead['presaleExecutive'] !== "") {
        //     lead['assignedTo'] = "presaleExecutive";
        // }
        // else if (lead['salesExecutive'] && lead['salesExecutive'] !== "") {
        //     lead['assignedTo'] = "salesExecutive";
        // }

        //For digital leads when status is empty assign the value New for Status
        if (!lead['status']) {
            lead['status'] = mongoose.mongo.ObjectId('61e7e28596f4e2283c6316f5');
        }
        await addLeadService(req.body).then(async (response) => {
            return response;
        }).then(async (updatedLead) => {
            console.log("Create Activity Modules from New Lead");
            // let activity_payload = [];
            // let lead_created = ["email", "phone"];
            // let sources = ["channel", "medium", "source"];

            // //do all the activity process here
            // //------------------lead_created activity------------------------
            // let activity_1 = {
            //     'action': "lead_created",
            //     'userId': userId,
            //     'leadId': updatedLead["_id"],
            //     'createdAt': new Date()
            // };

            // lead_created.forEach((element, index, array) => {
            //     if (updatedLead[element] !== "" && updatedLead[element] !== undefined) {
            //         activity_1[element] = updatedLead[element];
            //     }
            // })
            // activity_payload.push(activity_1);
            // //------------------lead_created activity------------------------

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

            // //------------------source activity------------------------
            // let activity_3 = {
            //     'action': "source",
            //     'leadId': updatedLead["_id"],
            //     'userId': userId,
            //     'createdAt': new Date()
            // };
            // sources.forEach((element, index, array) => {
            //     if (updatedLead[element] !== "" && updatedLead[element] !== undefined) {
            //         activity_3[element] = updatedLead[element];
            //     }
            // })
            // activity_payload.push(activity_3);
            // //------------------source activity------------------------

            // //-----------------------assign activity------------------------
            // let activity_4 = {
            //     'leadId': updatedLead["_id"],
            //     'userId': userId,
            //     'createdAt': new Date()
            // };
            // if (updatedLead['presaleExecutive'] && updatedLead['presaleExecutive'] !== "") {
            //     activity_4['assignedTo'] = updatedLead["presaleExecutive"]
            //     activity_4['action'] = "assignedTopresaleExecutive"
            //     activity_payload.push(activity_4);
            // }
            // else if (updatedLead['salesExecutive'] && updatedLead['salesExecutive'] !== "") {
            //     activity_4['assignedTo'] = updatedLead["salesExecutive"]
            //     activity_4['action'] = "assignedTosalesExecutive"
            //     activity_payload.push(activity_4);
            // }
            // //----------------------assign activity------------------------

            // let activityResponse = await apiCreateMultipleActivity(activity_payload);
            // let response = { updatedLead, activityResponse }
            console.log("resPonse", updatedLead);
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
        let comment = null, userId = null, userName = null, assign = { "position": null, "id": null };


        if (lead.comment) {
            comment = lead.comment;
            delete lead.comment;
        }
        if (lead.userId) {
            userId = mongoose.mongo.ObjectId(lead.userId);
            delete lead.userId;
        }

        const updatedLead = await editExistingLead(lead).then(async (response) => {
            return response;
        }).then(async (updatedLead) => {
            console.log("updated lead", updatedLead);
            let activity_payload = [], comment_activity, project_activity, handover_completed_activity, handover_requested_activity;

            //do all the activity process here
            //------------------comment activity------------------------
            // if (comment !== null) {
            //     comment_activity = {
            //         'action': "comment",
            //         'leadId': updatedLead["_id"],
            //         'userId': userId,
            //         'comment': comment,
            //         'createdAt': new Date()
            //     };
            //     activity_payload.push(comment_activity);
            // }
            //------------------comment activity------------------------

            //------------------project activity------------------------
            // if (lead.projects && lead.projects.length > 0) {
            //     project_activity = {
            //         'action': "project_enquiry",
            //         'leadId': updatedLead["_id"],
            //         'userId': userId,
            //         'project': lead.projects.slice(-1).pop(),
            //         'createdAt': new Date()
            //     };
            //     activity_payload.push(project_activity);
            // }
            //------------------project activity------------------------

            //------------------handover_requested_activity activity------------------------
            // if (params.handoverRequested === 'true') {
            //     // set assign to variable on handover_requested process
            //     handover_requested_activity = {
            //         'action': "handover_requested",
            //         'leadId': updatedLead["_id"],
            //         'userId': userId,
            //         'createdAt': new Date()
            //     };
            //     if (lead.handoverRequestedTo === "salesExecutive") {
            //         handover_requested_activity['type'] = "presaleExecutiveTosalesExecutive";
            //     } else if (lead.handoverRequestedTo === "presaleExecutive") {
            //         handover_requested_activity['type'] = "salesExecutiveTopresaleExecutive";
            //     }
            //     activity_payload.push(handover_requested_activity);
            // }
            //------------------handover_requested_activity activity------------------------

            //------------------handover_accepted_activity activity------------------------

            // if (params.handoverCompleted === 'true') {
            //     // set assign to variable on handover_requested process
            //     handover_completed_activity = {
            //         'action': "handover_completed",
            //         'leadId': updatedLead["_id"],
            //         'userId': userId,
            //         'createdAt': new Date()
            //     };

            //     if (lead.handoverRequestedTo === "salesExecutive") {
            //         handover_completed_activity['type'] = "presaleExecutiveTosalesExecutive";
            //         handover_completed_activity['handoverTo'] = mongoose.mongo.ObjectId(lead.salesExecutive);
            //         handover_completed_activity['handoverFrom'] = mongoose.mongo.ObjectId(lead.presaleExecutive);
            //     } else if (lead.handoverRequestedTo === "presaleExecutive") {
            //         handover_completed_activity['type'] = "salesExecutiveTopresaleExecutive";
            //         handover_completed_activity['handoverTo'] = mongoose.mongo.ObjectId(lead.presaleExecutive);
            //         handover_completed_activity['handoverFrom'] = mongoose.mongo.ObjectId(lead.salesExecutive);
            //     }
            //     activity_payload.push(handover_completed_activity);
            // }
            //------------------handover_accepted_activity activity------------------------

            // let response, activityResponse;
            // if (activity_payload.length > 0) {
            //     activityResponse = await apiCreateMultipleActivity(activity_payload);
            //     response = { updatedLead, activityResponse }
            // } else {
            //     response = { updatedLead, activityResponse }
            // }
            //console.log("Updated lead with activity", response);
            res.status(200).send(updatedLead)
        })
        //res.status(200).send(updatedLead)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


export default router