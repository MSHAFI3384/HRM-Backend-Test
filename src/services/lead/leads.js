import models from '../../models'
import { omit, reject } from 'lodash'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'

export const processCsv = data => new Promise(async (resolve,reject)=>{

    if(!data) throw new APIError(MISSING_PARAMETER)
    if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
    // if(!data.body.csvReferenceArray) throw new APIError(MISSING_PARAMETER)

    let {csvArray} = data.body
    console.log(csvArray)
    // let csvReferenceArray = data.body.csvReferenceArray

    try{
        
        await Promise.all(
            csvArray.map((item,index)=>{
                if(item.location){
                    let result = models.Location.findOne({name:item.location}).select('_id');
                    // item.location=_id
                    console.log('||||||||',result)
                }
            })
        )

        // csvArray.map((item,index)=>{
        //     if(item.location){
        //         let result = models.Location.findOne({name:item.location}).select('_id');
        //         // item.location=_id
        //         console.log('||||||||',result)
        //     }
        // })
        
        console.log(csvArray);

        // models.Lead.insertMany(finalArray,{ordered:true})
        // .then(data => {
        //     resolve(data);
        // })
        // .catch(err => {
        //     reject(err);
        // });
        
        resolve(finalArray)
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