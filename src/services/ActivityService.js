//const Activity = require("../models/Activity");
import Activity, { ActivitySchema } from "../models/Activity";
import mongoose from 'mongoose';
import models from "../models";
const ActivityCollection = mongoose.model('Activity', ActivitySchema);

module.exports = class ActivityService {
    static async test(data) {
        try {

            //const test = await ActivityCollection.collection.insertOne(data)
            //const test = await Activity(data).save().populate('stage')
            const activity = new Activity(data);
            const populate_options = [
                'stage'
            ];
            const created_course = await activity.save();
            const test = await created_course.populate(populate_options).execPopulate();

            console.log("testService called", test);
            return test;
        } catch (error) {
            console.log(`test ${error}`)
        }
    }

    static async getAllActivitys() {
        try {
            const allActivitys = await Activity.find();
            return allActivitys;
        } catch (error) {
            console.log(`Could not fetch Activitys ${error}`)
        }
    }

    static async createActivity(data) {
        try {
            const response = await new Activity(newActivity).save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async createMultipleActivity(data) {
        try {
            console.log('createMultipleActivity',data)
            const multipleActivityresponse = await new models.Activity(data).save();
            return multipleActivityresponse;
        } catch (error) {
            console.log(error);
        }

    }

    static async createMultipleActivityUsingEdit(data) {
        try {
            console.log('createMultipleActivityUsingEdit Service ==',data)
            let result = await models.Activity.findOneAndUpdate({leadId:data.leadId},{$push:{timeline:data.activity_payload}})
            // console.log('result using edit =',result);
            return result

        } catch (error) {

            console.log('createMultipleActivityUsingEdit Error ==',error);
        }

    }

    static async getActivitybyId(ActivityId) {
        try {
            const singleActivityResponse = await Activity.findById({ _id: ActivityId });
            return singleActivityResponse;
        } catch (error) {
            console.log(`Activity not found. ${error}`)
        }
    }

    static async getActivityByLeadId(leadId) {
        try {
            const leadActivityResponse = await Activity.findOne({ leadId: leadId }).populate("leadId timeline.source timeline.assignedTo timeline.leadStatusFrom timeline.leadStatusTo timeline.userId","-password");
            return leadActivityResponse;
        } catch (error) {
            console.log(`Lead Activity not found. ${error}`)
        }
    }

    static async updateActivity(title, body, ActivityImage) {
        try {
            const updateResponse = await Activity.updateOne(
                { title, body, ActivityImage },
                { $set: { date: new Date.now() } });

            return updateResponse;
        } catch (error) {
            console.log(`Could not update Activity ${error}`);

        }
    }

    static async deleteActivity(ActivityId) {
        try {
            const deletedResponse = await Activity.findOneAndDelete(ActivityId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete Activity ${error}`);
        }

    }
}