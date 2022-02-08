import models from '../../models'
import { omit } from 'lodash'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER } from '../../utilities/handleError'

export const processCsv = data => new Promise((resolve,reject)=>{

    if(!data) throw new APIError(MISSING_PARAMETER)
    if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
    if(!data.body.csvReferenceArray) throw new APIError(MISSING_PARAMETER)

    let csvArray = data.body.csvArray
    let csvReferenceArray = data.body.csvReferenceArray

    try{
        let finalArray = []
        let leadObject = {}
        
        // let objectTypes =['location','status','designation','source']
        let objectTypes =[
            {name:'location',modelName:'Location'},
            {name:'status',modelName:'Status'},
            {name:'designation', modelName:'Designation'},
            {name:'source',modelName:'Source'},
        ]
        csvArray.map((item,index)=>{
            csvReferenceArray.map((bItem,bIndex)=>{
                if(bItem.name === 'location' || bItem.name==='designation' || bItem.name==='source' || bItem.name==='status'){
                    let modelName = bItem.name === 'location' ? 'Location' :
                        bItem.name === 'source' ? 'Source' : 
                        bItem.name === 'designation' ? 'Designation' :
                        bItem.name === 'status' ? 'Status' : null

                    models[modelName].findOne({name:item[bItem.value.csvFieldId]},(err,result)=>{
                        console.log(result);
                        leadObject[bItem.name] = (result?._id ? result._id : "")
                    })
                        
                    // .exec((err,result)=>{
                    //     console.log(result);
                    //     leadObject[bItem.name] = result?._id ? result._id : ""
                    //     })
                }
                else{
                    leadObject[bItem.name] = bItem.value ? item[bItem.value.csvFieldId] : ""
                }

            })
            console.log(leadObject)
            finalArray.push(leadObject)
            leadObject={}
        })
        // finalArray.splice(0,1);

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