import express from 'express'
import cors from 'cors'
import API from './api'
import mongoose from './mongoose'
import cron from './services/cron';
import APIlogger from './utilities/log';


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(APIlogger)

app.use(API)

mongoose(app)
cron(app)


module.exports = app