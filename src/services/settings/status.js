import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addStatusService = newStatus => new Promise((resolve, reject) => {
        new models.Status(newStatus).save((err, doc) => {
            if (err) reject(err)
            resolve(doc)
        })
})

export const editExistingStatusService = updatedStatus => new Promise((resolve, reject) => {
    if (!updatedStatus || !updatedStatus.stageId || !updatedStatus.id)
        reject({ message: messages.errors.missingParameters })

    models.Stage.findById(updatedStatus.stageId, (err) => {
        if (err) reject({ message: messages.errors.invalidStage })

        models.Status
            .findByIdAndUpdate(updatedStatus.id, updatedStatus, { new: true }, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
    })
})

export const deleteExistingStatusService = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Status.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllStatus = (query) => new Promise(async (resolve, reject) => {
    try {
        let status = await models.Status.find(query).populate('stageId');
        resolve(status)
    } catch (err) {
        reject(err)
    }
})

export const listStagesWithStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const status = await models.Status.find().populate('stageId')
            let stageArray = []
            if (status && status.length > 0) {
                status.map(item => {
                    if (stageArray.length > 0) {
                        let { stageId } = item
                        item.stageId = undefined
                        let index = stageArray.findIndex(o => o.name === stageId.name)
                        if (index >= 0) {
                            if (stageArray[index].statusList && stageArray[index].statusList.length > 0) {
                                stageArray[index].statusList.push(item)
                            } else {
                                stageArray[index].statusList = []
                                stageArray[index].statusList.push(item)
                            }
                        } else {
                            let obj = { ...stageId.toJSON() }
                            obj["statusList"] = []
                            obj["statusList"].push(item)
                            stageArray.push(obj)
                        }
                    } else {
                        let { stageId } = item
                        item.stageId = undefined
                        let obj = { ...stageId.toJSON() }
                        obj["statusList"] = []
                        obj["statusList"].push(item)
                        stageArray.push(obj)
                    }
                })
            }
            resolve(stageArray)
        } catch (error) {
            reject(error)
        }
    })
}

/*Author: Sharnam J
  Date: 8-Nov-2021
  Description: Batch Fetch API added. new API added to fetch the status of stages by stageIds.*/
export const fetchStatusByStageIds = (stageIds) => new Promise(async (resolve, reject) => {
    try {
        let status = await models.Status.find({ stageId: { $in: stageIds } });
        return resolve(status);
    } catch (err) {
        reject(err);
    }
})
