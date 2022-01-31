import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addNewChannelService = newChannel => new Promise((resolve, reject) => {
    if (!newChannel) reject({ message: messages.errors.missingParameters })

    new models.Channel(newChannel).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })

})

export const editExistingChannelService = updatedChannel => new Promise((resolve, reject) => {
    if (!updatedChannel || !updatedChannel.id) reject({ message: messages.errors.missingParameters })
    models.Channel.findByIdAndUpdate(updatedChannel.id, updatedChannel, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})


export const deleteExistingChannel = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Channel.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllChannelsService = () => new Promise((resolve, reject) => {
    models.Channel.find({}, (err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})

