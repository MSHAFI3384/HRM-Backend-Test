import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addCampaignService = newCampaign => new Promise((resolve, reject) => {
    if (!newCampaign || !newCampaign.sourceId)
        reject({ message: messages.errors.missingParameters })

    models.Source.findById(newCampaign.sourceId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        new models.Campaign(newCampaign).save((err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
    })
})

export const editExistingCampaignService = updatedCampaign => new Promise((resolve, reject) => {
    if (!updatedCampaign || !updatedCampaign.sourceId || !updatedCampaign.id)
        reject({ message: messages.errors.missingParameters })

    models.Source.findById(updatedCampaign.sourceId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        models.Campaign
            .findByIdAndUpdate(updatedCampaign.id, updatedCampaign, { new: true }, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
    })
})

export const deleteExistingCampaignService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Campaign.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllCampaigns = (query) => new Promise(async (resolve, reject) => {
    try {
        let campaigns = await models.Campaign.find(query).populate('sourceId').populate('subSourceId')
        resolve(campaigns)
    } catch (err) {
        reject(err)
    }
})