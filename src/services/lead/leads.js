import models from '../../models'
import { omit, reject } from 'lodash'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'

export const processCsv = data => new Promise(async (resolve,reject) => {

    try{
    if(!data) throw new APIError(MISSING_PARAMETER)
    if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
    if(!data.body.primaryOwner) throw new APIError(MISSING_PARAMETER)

    let {csvArray} = data.body
    let {primaryOwner} = data.body

    console.log(csvArray,'|||||||||',primaryOwner)
    // let csvReferenceArray = data.body.csvReferenceArray
    let locationData = await models.Location.find({}).select('name _id')
    let designationData = await models.Designation.find({}).select('name _id')
    let sourceData = await models.Source.find({}).select('name _id')
    let statusData = await models.Status.find({}).select('name _id')

    console.log(locationData,designationData,statusData);

    const findDataFromArray = (dataArray,name) => {
        let objectId = ''
        dataArray.forEach((item,index)=>{
            if(name === item.name) objectId=item._id
        })
        return objectId
    }
    
   
        for (const item of csvArray) {
            item['contact_owner'] = primaryOwner
            item.location = findDataFromArray(locationData,item.location)
            item.designation = findDataFromArray(designationData,item.designation)
            item.source = findDataFromArray(sourceData,item.source)
            item.status = item.status ? findDataFromArray(statusData,item.status) : findDataFromArray(statusData,'New')
        }
        
        console.log(csvArray);
        

        models.Lead.insertMany(csvArray,{ordered:true})
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            console.log(err)
            throw new Error(err)
        });
        
        // resolve(csvArray)
    }
    catch(err) {
        reject(err)
    }


})

// export const processModel = (itemName,modelName,value) => new Promise((resolve,reject)=>{
//     let dataToReturn = {}
//     models[modelName].findOne({name:value})
//     .then(result1=>{
//         // dataToReturn[itemName]=result1._id ? result1._id : null
//         // console.log(result1,dataToReturn)
//         resolve(result1._id ? result1._id : null)
//     })
//     .catch(err=>{
//         reject(err);
//     })
// })

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
            leads = await models.Lead.find(query, fields, pagination).populate(["source","designation","location","status"]);
        }
        resolve(leads)
    } catch (error) {
        reject(error)
    }
})
// export const listAllLeadsService = queries => new Promise(async (resolve, reject) => {
//     try {
//         let { query, fields, pagination, count } = queries
//         let leads;
//         if (count) {
//             leads = await models.Lead.countDocuments(query)
//         } else {
//             leads = await models.Lead.find(query, fields, pagination).populate(["presaleExecutive", "salesExecutive","stage","status"]);
//         }
//         resolve(leads)
//     } catch (error) {
//         reject(error)
//     }
// })

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