import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';

export const addNextAction = newNextAction => new Promise((resolve, reject) => {
    if (!newNextAction) reject({ message: messages.errors.missingParameters })

    new models.NextAction(newNextAction).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})


export const editNextAction = updatedNextAction => new Promise((resolve, reject) => {
    if (!updatedNextAction || !updatedNextAction?.id)
        reject({ message: messages.errors.missingParameters })

    models.NextAction.findByIdAndUpdate(updatedNextAction.id, updatedNextAction, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})


export const deleteNextAction = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.NextAction.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllNextActions = query => new Promise((resolve, reject) => {
    models.NextAction.find(query, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})

