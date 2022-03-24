import models from '../../models'
import { gte, omit, reject } from 'lodash'
import APIError from '../../utilities/APIError'
import { MISSING_PARAMETER, USER_ALREADY_EXIST } from '../../utilities/handleError'

export const processCsv = data => new Promise(async (resolve,reject) => {

    try{
    if(!data) throw new APIError(MISSING_PARAMETER)
    if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
    if(!data.body.primaryOwner) throw new APIError(MISSING_PARAMETER)

    let {csvArray} = data.body
    let {primaryOwner} = data.body

    // console.log(csvArray,'|||||||||',primaryOwner)
    // let csvReferenceArray = data.body.csvReferenceArray
    let locationData = await models.Location.find({}).select('name _id')
    let designationData = await models.Designation.find({}).select('name _id')
    let sourceData = await models.Source.find({}).select('name _id')
    let statusData = await models.Status.find({}).select('name _id')

    // console.log(locationData,designationData,statusData);

    const findDataFromArray = (dataArray,name) => {
        let objectId = ''
        dataArray.map((item,index)=>{
            if(name === item.name) objectId=item._id
        })
        return objectId
    }
    
   
        for (const item of csvArray) {
            let uniqueEmail = await models.Lead.find({email:item.email})
            let uniquePhone = await models.Lead.find({phone_number:item.phone_number})

            if (uniqueEmail.length>0 || uniquePhone.length>0){
                throw new APIError(USER_ALREADY_EXIST)
            }else{
                item['contact_owner'] = primaryOwner
                if(item.location) item["location"] = findDataFromArray(locationData,item.location);
                // item.location =  findDataFromArray(locationData,item.location)
                if(item.designation) item["designation"] = findDataFromArray(designationData,item.designation)
                if (item.source) item['source'] = findDataFromArray(sourceData,item.source)
                item['status'] = item.status ? findDataFromArray(statusData,item.status) : findDataFromArray(statusData,'New')
            }


        }
        
        console.log(csvArray);
        

        let response = await models.Lead.insertMany(csvArray,{ordered:true})
        resolve(response)
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

export const countLeadService = data => new Promise(async(resolve,reject)=>{
    try{
        // if(!data) throw new APIError(MISSING_PARAMETER)
        if(!data.body) {
            throw new APIError(MISSING_PARAMETER)
        }else{
            let {past,present} = data.body
            let finalPayload = {}
            // console.log('????????????????????????????????????',past)
            // console.log('????????????????????????????????????',present)
            let statusData = await models.Status.find({})
    
            let result = await models.Lead.find({createdAt:{$gte:past,$lt:present}}).countDocuments();
            finalPayload['_total']= result
    
            for (let item of statusData){
                let result1 = await models.Lead.find({status:item._id,createdAt:{$gte:past,$lt:present}}).countDocuments();
                finalPayload[`_${item.name.replace(/\s/g,'')}`] = result1
            }
            console.log(finalPayload)
            resolve(finalPayload)
        }


    }catch(err){
        reject (err)
    }

})

export const listAllLeadsService = (queries,data) => new Promise(async (resolve, reject) => {
    try {
        let mainUser = data.mainUser
        // console.log('%%%%%%%%%%%%%%%%%%%%',mainUser)
        let { query, fields, pagination, count } = queries
        let leads;
        if (count) {
            leads = await models.Lead.countDocuments(query)
        } 
        else if (mainUser.role === 'Evaluator') {
            let leads1 = await models.Lead.find(query, fields, pagination).populate(["source","designation","location","status","contact_owner"]);
            leads =[]
            for(let item of leads1){
                if(item.secondary_owners.length > 0){
                    for(let item1 of item.secondary_owners){
                        // console.log(item.first_name,item1)
                        if(item1.userId.toString() === mainUser._id.toString()) leads.push(item)
                    }
                }
            }
            // console.log('Evaluator leads ====',leads)
        }
        else {
            leads = await models.Lead.find(query, fields, pagination).populate(["source","designation","location","status","contact_owner"]);
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

export const editExistingLead = updatedLead => new Promise((resolve, reject) => {
    console.log('editExistingLead ==',updatedLead);
    models.Lead.findByIdAndUpdate(updatedLead.id, omit(updatedLead, ['id']), { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})