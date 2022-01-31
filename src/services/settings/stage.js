import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addNewStageService = newStage => new Promise((resolve, reject) => {
    if (!newStage) reject({ message: messages.errors.missingParameters })

    new models.Stage(newStage).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editExistingStageService = updatedStage => new Promise((resolve, reject) => {
    if (!updatedStage) reject({ message: messages.errors.missingParameters })
    models.Stage.findByIdAndUpdate(updatedStage.id, updatedStage, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})


export const deleteExistingStage = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Stage.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllStagesService = () => new Promise((resolve, reject) => {
    models.Stage.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})

