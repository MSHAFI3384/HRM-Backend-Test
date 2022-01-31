import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addCampaignContentService = newCampaignContent => new Promise((resolve, reject) => {
    if (!newCampaignContent || !newCampaignContent.campaignId)
        reject({ message: messages.errors.missingParameters })

    models.Campaign.findById(newCampaignContent.campaignId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        new models.CampaignContent(newCampaignContent).save((err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
    })
})

export const editExistingCampaignContentService = updatedCampaignContent => new Promise((resolve, reject) => {
    if (!updatedCampaignContent || !updatedCampaignContent.campaignId || !updatedCampaignContent.id)
        reject({ message: messages.errors.missingParameters })

    models.Campaign.findById(updatedCampaignContent.campaignId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        models.CampaignContent
            .findByIdAndUpdate(updatedCampaignContent.id, updatedCampaignContent, { new: true }, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
    })
})

export const deleteExistingCampaignContentService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.CampaignContent.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllCampaignContents = (query) => new Promise(async (resolve, reject) => {
    try {
        let campaignsContent = await models.CampaignContent.find(query).populate('campaignId');
        resolve(campaignsContent)
    } catch (err) {
        reject(err)
    }
})