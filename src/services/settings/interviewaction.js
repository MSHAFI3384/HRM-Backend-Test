import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'

export const addInterviewActionService = newInterviewAction => new Promise((resolve, reject) => {

    if (!newInterviewAction) reject({ message: messages.errors.missingParameters })

    new models.InterviewAction(newInterviewAction).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editInterviewActionService = updatedInterviewAction => new Promise((resolve, reject) => {

    if (!updatedInterviewAction) reject({ message: messages.errors.missingParameters })

    models.InterviewAction
        .findByIdAndUpdate(updatedInterviewAction.id, updatedInterviewAction, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})

export const deleteInterviewActionService = id => new Promise(async (resolve, reject) => {

    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.InterviewAction.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})

export const listAllInterviewActionService = () => new Promise((resolve, reject) => {
    models.InterviewAction.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})