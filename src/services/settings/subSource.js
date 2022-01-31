import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addSubSourceService = newSubSource => new Promise((resolve, reject) => {
    if (!newSubSource)
        reject({ message: messages.errors.missingParameters })

    new models.SubSource(newSubSource).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editExistingSubSource = updatedSource => new Promise((resolve, reject) => {
    if (!updatedSource)
        reject({ message: messages.errors.missingParameters })

    models.SubSource
        .findByIdAndUpdate(updatedSource.id, updatedSource, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})



export const deleteSubSourceService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.SubSource.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})

export const listAllSubSourceService = (query) => new Promise(async (resolve, reject) => {
    try {
        let status = await models.SubSource.find(query).populate('sourceId');
        resolve(status)
    } catch (err) {
        reject(err)
    }
})