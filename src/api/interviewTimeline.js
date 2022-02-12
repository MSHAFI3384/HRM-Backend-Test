import express from 'express'
import mongoose from 'mongoose'
import { addInterviewTimeline } from '../services/interviewTimelineService'
import { verifyToken } from '../utilities/auth'
import { handle_server_error } from '../utilities/handleError'

const router = express.Router()

router.post('/add',verifyToken,async (req,res)=>{
    try{
        const addResult = await addInterviewTimeline(req)
        res.status(200).send(addResult)
    }
    catch(err){
        let error = await handle_server_error(req,error)
        res.status(error.code).send(error)
    }
})

export default router