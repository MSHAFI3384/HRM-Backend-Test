import express from 'express'
import mongoose from 'mongoose'
import { addInterviewTimeline, listInterviewTimeline } from '../services/interviewTimelineService'
import { verifyToken } from '../utilities/auth'
import { handle_server_error } from '../utilities/handleError'
import multer from 'multer';

const multeroptions = multer();

const router = express.Router()

router.post('/add',verifyToken, multeroptions.array("uploadFile",5) , async (req,res)=>{
    try{
        let addResult = await addInterviewTimeline(req)
        // console.log(addResult)
        res.status(200).send(addResult)
    }
    catch(err){
        let error = await handle_server_error(req,error)
        res.status(error.code).send(error)
    }
})

router.post('/list',verifyToken,async(req,res)=>{
    try{
        let result = await listInterviewTimeline(req)
        res.status(200).send(result)
    }
    catch(err){
        let error = await handle_server_error(req,error)
        res.status(error.code).send(error)
    }
})

export default router