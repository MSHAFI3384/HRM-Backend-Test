import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'


export const addDesignationService = newDesignation => new Promise((resolve, reject) => {

    if (!newDesignation) reject({ message: messages.errors.missingParameters })

    new models.Designation(newDesignation).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editDesignationService = updatedDesignation => new Promise((resolve, reject) => {

    if (!updatedDesignation) reject({ message: messages.errors.missingParameters })

    models.Designation
        .findByIdAndUpdate(updatedDesignation.id, updatedDesignation, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})

export const deleteDesignationService = id => new Promise(async (resolve, reject) => {

    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Designation.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})

export const listAllDesignationService = () => new Promise((resolve, reject) => {
    models.Designation.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})