import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';



export const addDemogrpahic = newDemogrpahic => new Promise((resolve, reject) => {
    if (!newDemogrpahic)
        reject({ message: messages.errors.missingParameters })

    new models.Demographic(newDemogrpahic).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})



export const editDemogrpahic = updatedDemographic => new Promise((resolve, reject) => {
    if (!updatedDemographic || !updatedDemographic.id)
        reject({ message: messages.errors.missingParameters })

    models.Demographic.findByIdAndUpdate(updatedDemographic.id, updatedDemographic, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})

export const deleteDemographic = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Demographic.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllDemogrpahics = query => new Promise((resolve, reject) => {
    models.Demographic.find(query, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})