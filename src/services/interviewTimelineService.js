import models from "../models"
import { MISSING_PARAMETER } from "../utilities/handleError"

export const addInterviewTimeline = data => new Promise((resolve,reject)=>{
    if(!data) reject(MISSING_PARAMETER)
    new models.InterviewTimeline(data.body).save()
    .then((result)=>{
        resolve(result)
    })
})