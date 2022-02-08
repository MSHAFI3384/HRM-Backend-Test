import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'


export const addInterviewScoreService = newInterviewScore => new Promise((resolve, reject) => {

    if (!newInterviewScore) reject({ message: messages.errors.missingParameters })

    new models.InterviewScore(newInterviewScore).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editInterviewScoreService = updatedInterviewScore => new Promise((resolve, reject) => {

    if (!updatedInterviewScore) reject({ message: messages.errors.missingParameters })

    models.InterviewScore
        .findByIdAndUpdate(updatedInterviewScore.id, updatedInterviewScore, { new: true }, (err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})

export const deleteInterviewScoreService = id => new Promise(async (resolve, reject) => {

    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.InterviewScore.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})

export const listAllInterviewScoreService = () => new Promise((resolve, reject) => {
    models.InterviewScore.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})