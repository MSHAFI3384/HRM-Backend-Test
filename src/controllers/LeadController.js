
import { processModel } from '../services/lead/leads'
import APIError from '../utilities/APIError'
import { MISSING_PARAMETER } from '../utilities/handleError'

// export const processCsv = data => new Promise((resolve,reject)=>{

//     if(!data) throw new APIError(MISSING_PARAMETER)
//     if(!data.body.csvArray) throw new APIError(MISSING_PARAMETER)
//     if(!data.body.csvReferenceArray) throw new APIError(MISSING_PARAMETER)

//     let csvArray = data.body.csvArray
//     let csvReferenceArray = data.body.csvReferenceArray

//     try{
        
//         // let objectTypes =['location','status','designation','source']
//         let objectTypes =[
//             {name:'location',modelName:'Location'},
//             {name:'status',modelName:'Status'},
//             {name:'designation', modelName:'Designation'},
//             {name:'source',modelName:'Source'},
//         ]
//         let finalArray = []
//         csvArray.map((item,index)=>{
//             // let leadObject = {}
//             // let promises = csvReferenceArray.map((bItem,bIndex)=>{
//             csvReferenceArray.map((bItem,bIndex)=>{
//             if(bItem.name === 'location' || bItem.name==='designation' || bItem.name==='source' || bItem.name==='status'){
//                     let modelName = bItem.name === 'location' ? 'Location' :
//                         bItem.name === 'source' ? 'Source' : 
//                         bItem.name === 'designation' ? 'Designation' :
//                         bItem.name === 'status' ? 'Status' : null

//                         // let result = await processModel(bItem.name,modelName,item[bItem.value.csvFieldId])
//                         // leadObject[bItem.name] = result? result : null
//                         // console.log(result)
//                         // console.log(leadObject)
//                         if(item[bItem.value.csvFieldId]){
//                             let result = models[modelName].findOne({name:item[bItem.value.csvFieldId]})
//                                 console.log(result);
//                                 leadObject[bItem.name] = result._id ? result._id : ""
//                                 console.log(leadObject);
//                             }
//                         else{
//                             leadObject[bItem.name] = null
//                         }
//                     }
//                     else{
//                         leadObject[bItem.name] = bItem.value ? item[bItem.value.csvFieldId] : ""
//                         // console.log('|||||||||||',leadObject);
//                 }
//                 // return leadObject
                
//             })
//             // await Promise.all(promises).then((finalResult)=>{
//             //     console.log('{}{}{}{}}{}{}}{}{}{}{}{}',finalResult)
//             // })
//             console.log('/////////////////////////////',leadObject)
//             finalArray.push(leadObject)
//             leadObject={}
//         })
//         // gconsole.log(finalArray);
//         // finalArray.splice(0,1);

//         // models.Lead.insertMany(finalArray,{ordered:true})
//         // .then(data => {
//         //     resolve(data);
//         // })
//         // .catch(err => {
//         //     reject(err);
//         // });
        
//         resolve(finalArray)
//     }
        
    
        
//     catch(err) {
//         reject(err)
//     }


// })