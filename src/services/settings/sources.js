import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'


export const addSourceService = newSource => new Promise((resolve, reject) => {
    if (!newSource) reject({ message: messages.errors.missingParameters })

    new models.Source(newSource).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
    
})

export const editExistingSource = updatedSource => new Promise((resolve, reject) => {
    if (!updatedSource) reject({ message: messages.errors.missingParameters })

    models.Source.findByIdAndUpdate(updatedSource.id, updatedSource, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
    
})




export const deleteSourceService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Source.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})

export const listAllSourceService = (query) => new Promise(async (resolve, reject) => {
    try {
        let sources = await models.Source.find({})                                             //models.Source.find(query).populate('mediumId');
        resolve(sources)
    } catch (err) {
        reject(err)
    }
})