import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';



export const addProjectStatus = newProjectStatus => new Promise((resolve, reject) => {
    if (!newProjectStatus)
        reject({ message: messages.errors.missingParameters })

    new models.ProjectStatus(newProjectStatus).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})


export const editProjectStatus = updatedProjectStatus => new Promise((resolve, reject) => {
    if (!updatedProjectStatus || !updatedProjectStatus.id)
        reject({ message: messages.errors.missingParameters })
    models.ProjectStatus.
        findByIdAndUpdate(updatedProjectStatus.id, updatedProjectStatus, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})


export const deleteProjectStatus = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.ProjectStatus.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllProjectStatus = query => new Promise((resolve, reject) => {
    models.ProjectStatus.find(query, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})