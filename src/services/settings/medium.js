import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addMediumService = newMedium => new Promise((resolve, reject) => {
    if (!newMedium || !newMedium.channelId)
        reject({ message: messages.errors.missingParameters })

    models.Channel.findById(newMedium.channelId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        new models.Medium(newMedium).save((err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
    })
})

export const editExistingMediumService = updatedMedium => new Promise((resolve, reject) => {
    if (!updatedMedium || !updatedMedium.channelId || !updatedMedium.id)
        reject({ message: messages.errors.missingParameters })

    models.Channel.findById(updatedMedium.channelId, (err) => {
        if (err) reject({ message: messages.errors.invalidSource })

        models.Medium
            .findByIdAndUpdate(updatedMedium.id, updatedMedium, { new: true }, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
    })
})

export const deleteExistingMediumService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Medium.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllMediums = (query) => new Promise((resolve, reject) => {
    models.Medium.find(query).populate('channelId').exec((err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})
