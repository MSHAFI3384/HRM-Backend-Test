import models from '../../models'
import { omit } from 'lodash'

export const leadtest = abc => new Promise((resolve, reject) => {
   
    models.Lead.deleteMany({ stage:"Hot"})
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
})

export const addLeadService = newLead => new Promise(async (resolve, reject) => {
    new models.Lead(newLead).save()
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
})

export const listAllLeadsService = queries => new Promise(async (resolve, reject) => {
    try {
        let { query, fields, pagination, count } = queries
        let leads;
        if (count) {
            leads = await models.Lead.countDocuments(query)
        } else {
            leads = await models.Lead.find(query, fields, pagination).populate(["presaleExecutive", "salesExecutive","stage","status"]);
        }
        resolve(leads)
    } catch (error) {
        reject(error)
    }
})

export const leadsDetailsService = lead => new Promise((resolve, reject) => {

    models.Lead.findOne({ _id: lead.id }).exec((err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})

export const leadsDetailsServiceByDynamicPopulate = (lead, keysToBePopulated) => new Promise((resolve, reject) => {

    models.Lead.findOne({ _id: lead.id }).populate(keysToBePopulated).exec((err, docs) => {
        if (err) reject(err)
        resolve(docs)
    })
})

export const editExistingLead = updatedLead => new Promise((resplve, reject) => {
    models.Lead.findByIdAndUpdate(updatedLead.id, omit(updatedLead, ['id']), { new: true }, (err, doc) => {
        if (err) reject(err)
        resplve(doc)
    })
})