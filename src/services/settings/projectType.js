import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';



export const addProjectType = newProjectType => new Promise((resolve, reject) => {
    if (!newProjectType)
        reject({ message: messages.errors.missingParameters })

    new models.ProjectType(newProjectType).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})


export const editProjectType = updatedProjectType => new Promise((resolve, reject) => {
    if (!updatedProjectType || !updatedProjectType.id)
        reject({ message: messages.errors.missingParameters })
    models.ProjectType.
        findByIdAndUpdate(updatedProjectType.id, updatedProjectType, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})


export const deleteProjectType = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.ProjectType.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllProjectTypes = query => new Promise((resolve, reject) => {
    models.ProjectType.find(query, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})