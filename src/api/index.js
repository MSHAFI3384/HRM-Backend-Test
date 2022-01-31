import express from 'express'
import leads from './leads'
import users from './users'
import settings from './settings'
import activity from './activities'

const router = express.Router()

const ActivityCtrl = require("../controllers/ActivityController");

//router.post("/activity", ActivityCtrl.apiCreateActivity);
router.use('/leads', leads)
router.use('/users', users)
router.use('/settings', settings)
router.use('/activity', activity)

export default router
