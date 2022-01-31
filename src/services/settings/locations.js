import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'


export const addLocationService = newLocation => new Promise((resolve, reject) => {

    if (!newLocation) reject({ message: messages.errors.missingParameters })

    new models.Location(newLocation).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})



export const editLocationService = updatedLocation => new Promise((resolve, reject) => {

    if (!updatedLocation) reject({ message: messages.errors.missingParameters })

    models.Location
        .findByIdAndUpdate(updatedLocation.id, updatedLocation, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})



export const deleteLocationService = id => new Promise(async (resolve, reject) => {

    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Location.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAlllocationService = () => new Promise((resolve, reject) => {
    models.Location.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})