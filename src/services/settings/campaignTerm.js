import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addCampaignTermService = newCampaignTerm => new Promise((resolve, reject) => {
    if (!newCampaignTerm || !newCampaignTerm.campaignId)
        reject({ message: messages.errors.missingParameters })

    models.Campaign.findById(newCampaignTerm.campaignId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        new models.CampaignTerm(newCampaignTerm).save((err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
    })
})

export const editExistingCampaignTermService = updatedCampaignTerm => new Promise((resolve, reject) => {
    if (!updatedCampaignTerm || !updatedCampaignTerm.campaignId || !updatedCampaignTerm.id)
        reject({ message: messages.errors.missingParameters })

    models.Campaign.findById(updatedCampaignTerm.campaignId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        models.CampaignTerm
            .findByIdAndUpdate(updatedCampaignTerm.id, updatedCampaignTerm, { new: true }, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
    })
})

export const deleteExistingCampaignTermService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.CampaignTerm.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllCampaignTerms = (query) => new Promise(async (resolve, reject) => {
    try {
        let campaignsTerms = await models.CampaignTerm.find(query).populate('campaignId');
        resolve(campaignsTerms)
    } catch (err) {
        reject(err)
    }
})