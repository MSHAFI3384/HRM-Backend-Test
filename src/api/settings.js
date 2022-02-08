import express from 'express'
import {
    addLocationService,
    editLocationService,
    deleteLocationService,
    listAlllocationService
} from '../services/settings/locations'

import {
    addSourceService,
    editExistingSource,
    deleteSourceService,
    listAllSourceService
} from '../services/settings/sources'

import {
    addCampaignService,
    editExistingCampaignService,
    deleteExistingCampaignService,
    listAllCampaigns
} from '../services/settings/campaigns'

import {
    addNewStageService,
    editExistingStageService,
    deleteExistingStage,
    listAllStagesService
} from '../services/settings/stage'

import {
    addStatusService,
    editExistingStatusService,
    deleteExistingStatusService,
    listAllStatus,
    listStagesWithStatus,
    fetchStatusByStageIds
} from '../services/settings/status'


import {
    addNewChannelService,
    editExistingChannelService,
    deleteExistingChannel,
    listAllChannelsService
} from '../services/settings/channels'


import {
    addMediumService,
    editExistingMediumService,
    deleteExistingMediumService,
    listAllMediums
} from '../services/settings/medium'


import {
    addSubSourceService,
    editExistingSubSource,
    deleteSubSourceService,
    listAllSubSourceService
} from '../services/settings/subSource'


import {
    addCampaignTermService,
    editExistingCampaignTermService,
    deleteExistingCampaignTermService,
    listAllCampaignTerms
} from '../services/settings/campaignTerm'

import {
    addCampaignContentService,
    editExistingCampaignContentService,
    deleteExistingCampaignContentService,
    listAllCampaignContents
} from '../services/settings/campaignContent'


import {
    addNextAction,
    editNextAction,
    deleteNextAction,
    listAllNextActions

} from '../services/settings/nextAction'


import {
    addDemogrpahic,
    editDemogrpahic,
    deleteDemographic,
    listAllDemogrpahics,
} from '../services/settings/demographic'

import {
    addProjectType,
    editProjectType,
    deleteProjectType,
    listAllProjectTypes
} from '../services/settings/projectType'


import {
    addProjectStatus,
    editProjectStatus,
    deleteProjectStatus,
    listAllProjectStatus
} from '../services/settings/projectStatus'


import {
    addProject,
    editProject,
    deleteProject,
    listAllProject,
    projectDetails
} from '../services/settings/project'

import {
    addDesignationService,
    editDesignationService,
    deleteDesignationService,
    listAllDesignationService
} from '../services/settings/designation'

import {
    addInterviewScoreService,
    editInterviewScoreService,
    deleteInterviewScoreService,
    listAllInterviewScoreService
} from '../services/settings/interviewscore'

import {
    addInterviewActionService,
    editInterviewActionService,
    deleteInterviewActionService,
    listAllInterviewActionService
} from '../services/settings/interviewaction'

import { verifyToken } from '../utilities/auth'
import { handle_server_error, SUCCESS } from '../utilities/handleError'

const router = express.Router()

router.post('/locations/add', verifyToken, async (req, res) => {
    try {
        const newLocation = await addLocationService(req.body)
        res.status(200).send(newLocation)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/locations/edit', verifyToken, async (req, res) => {
    try {
        const updatedLocation = await editLocationService(req.body)
        res.status(200).send(updatedLocation)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/locations/delete/:id', verifyToken, async (req, res) => {
    try {
        const removedLocation = await deleteLocationService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post(['/locations/', '/locations/list'], verifyToken, async (req, res) => {
    try {
        const allLocations = await listAlllocationService()
        res.status(200).send(allLocations)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/designation/add', verifyToken, async (req, res) => {
    try {
        const newDesignation = await addDesignationService(req.body)
        res.status(200).send(newDesignation)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/designation/edit', verifyToken, async (req, res) => {
    try {
        const updatedDesignation = await editDesignationService(req.body)
        res.status(200).send(updatedDesignation)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/designation/delete/:id', verifyToken, async (req, res) => {
    try {
        const removedDesignation = await deleteDesignationService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post(['/designation/', '/designation/list'], verifyToken, async (req, res) => {
    try {
        const allDesignations = await listAllDesignationService()
        res.status(200).send(allDesignations)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/interviewscore/add', verifyToken, async (req, res) => {
    try {
        const newInterviewScore = await addInterviewScoreService(req.body)
        res.status(200).send(newInterviewScore)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/interviewscore/edit', verifyToken, async (req, res) => {
    try {
        const updatedInterviewScore = await editInterviewScoreService(req.body)
        res.status(200).send(updatedInterviewScore)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/interviewscore/delete/:id', verifyToken, async (req, res) => {
    try {
        const removedInterviewScore = await deleteInterviewScoreService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post(['/interviewscore/', '/interviewscore/list'], verifyToken, async (req, res) => {
    try {
        const allInterviewScores = await listAllInterviewScoreService()
        res.status(200).send(allInterviewScores)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/interviewaction/add', verifyToken, async (req, res) => {
    try {
        const newInterviewAction = await addInterviewActionService(req.body)
        res.status(200).send(newInterviewAction)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/interviewaction/edit', verifyToken, async (req, res) => {
    try {
        const updatedInterviewAction = await editInterviewActionService(req.body)
        res.status(200).send(updatedInterviewAction)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/interviewaction/delete/:id', verifyToken, async (req, res) => {
    try {
        const removedInterviewAction = await deleteInterviewActionService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post(['/interviewaction/', '/interviewaction/list'], verifyToken, async (req, res) => {
    try {
        const allInterviewActions = await listAllInterviewActionService()
        res.status(200).send(allInterviewActions)
    } catch (err) { 
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/source/add', verifyToken, async (req, res) => {
    try {
        const newSource = await addSourceService(req.body)
        res.status(200).send(newSource)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/source/edit', verifyToken, async (req, res) => {
    try {
        const updatedSource = await editExistingSource(req.body)
        res.status(200).send(updatedSource)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/source/delete/:id', verifyToken, async (req, res) => {
    try {
        const updatedSource = await deleteSourceService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/source/list', verifyToken, async (req, res) => {
    try {
        const sources = await listAllSourceService(req.body)
        res.status(200).send(sources)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})



router.post('/campaign/add', verifyToken, async (req, res) => {
    try {
        const newCampaign = await addCampaignService(req.body)
        res.status(200).send(newCampaign)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/campaign/edit', verifyToken, async (req, res) => {
    try {
        const updatedCampaign = await editExistingCampaignService(req.body)
        res.status(200).send(updatedCampaign)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/campaign/delete/:id', verifyToken, async (req, res) => {
    try {
        const updatedCampaign = await deleteExistingCampaignService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/campaign/list', verifyToken, async (req, res) => {
    try {
        const allCampaigns = await listAllCampaigns(req.body)
        res.status(200).send(allCampaigns)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/stage/add', verifyToken, async (req, res) => {
    try {
        const newStage = await addNewStageService(req.body)
        res.status(200).send(newStage)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/stage/edit', verifyToken, async (req, res) => {
    try {
        const updatedStage = await editExistingStageService(req.body)
        res.status(200).send(updatedStage)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/stage/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedStage = await deleteExistingStage(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/stage/list', verifyToken, async (req, res) => {
    try {
        /*Author: Sharnam J
          Date: 9-Nov-2021
          Description: stage list API has been modified.
          Only stages will be fetched with no child data.*/
        const stages = await listAllStagesService(req.body)
        //console.log("stages", stages);
        res.status(200).send(stages)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/status/add', verifyToken, async (req, res) => {
    try {
        const newStatus = await addStatusService(req.body)
        res.status(200).send(newStatus)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/status/edit', verifyToken, async (req, res) => {
    try {
        const updatedStatus = await editExistingStatusService(req.body)
        res.status(200).send(updatedStatus)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/status/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedStatus = await deleteExistingStatusService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/status/list', verifyToken, async (req, res) => {
    try {
        const allStatus = await listAllStatus(req.body)
        res.status(200).send(allStatus)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/channel/add', verifyToken, async (req, res) => {
    try {
        const newChannel = await addNewChannelService(req.body)
        res.status(200).send(newChannel)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/channel/edit', verifyToken, async (req, res) => {
    try {
        const updatedChannel = await editExistingChannelService(req.body)
        res.status(200).send(updatedChannel)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/channel/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedChannel = await deleteExistingChannel(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/channel/list', verifyToken, async (req, res) => {
    try {
        const allChannel = await listAllChannelsService(req.body)
        res.status(200).send(allChannel)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/medium/add', verifyToken, async (req, res) => {
    try {
        const addMedium = await addMediumService(req.body)
        res.status(200).send(addMedium)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/medium/edit', verifyToken, async (req, res) => {
    try {
        const updatedMedium = await editExistingMediumService(req.body)
        res.status(200).send(updatedMedium)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/medium/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedMedium = await deleteExistingMediumService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/medium/list', verifyToken, async (req, res) => {
    try {
        const allMedium = await listAllMediums(req.body)
        res.status(200).send(allMedium)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/subsource/add', verifyToken, async (req, res) => {
    try {
        const newSubsource = await addSubSourceService(req.body)
        res.status(200).send(newSubsource)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/subsource/edit', verifyToken, async (req, res) => {
    try {
        const updatedSubsource = await editExistingSubSource(req.body)
        res.status(200).send(updatedSubsource)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.delete('/subsource/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedSubsource = await deleteSubSourceService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/subsource/list', verifyToken, async (req, res) => {
    try {
        const allSubsources = await listAllSubSourceService(req.body)
        res.status(200).send(allSubsources)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/campaignTerm/add', verifyToken, async (req, res) => {
    try {
        const newCampaignTerm = await addCampaignTermService(req.body)
        res.status(200).send(newCampaignTerm)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/campaignTerm/edit', verifyToken, async (req, res) => {
    try {
        const updatedCampaign = await editExistingCampaignTermService(req.body)
        res.status(200).send(updatedCampaign)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/campaignTerm/delete/:id', verifyToken, async (req, res) => {
    try {
        const updatedCampaign = await deleteExistingCampaignTermService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/campaignTerm/list', verifyToken, async (req, res) => {
    try {
        const allCampaignTerms = await listAllCampaignTerms(req.body)
        res.status(200).send(allCampaignTerms)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/campaignContent/add', verifyToken, async (req, res) => {
    try {
        const newCampaignContent = await addCampaignContentService(req.body)
        res.status(200).send(newCampaignContent)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/campaignContent/edit', verifyToken, async (req, res) => {
    try {
        const updatedCampaignContent = await editExistingCampaignContentService(req.body)
        res.status(200).send(updatedCampaignContent)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/campaignContent/delete/:id', verifyToken, async (req, res) => {
    try {
        const updatedCampaignContent = await deleteExistingCampaignContentService(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(erre, req);
        res.status(error.code).send(err)
    }
})

router.post('/campaignContent/list', verifyToken, async (req, res) => {
    try {
        const allCampaignContents = await listAllCampaignContents(req.body)
        res.status(200).send(allCampaignContents)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/nextAction/add', verifyToken, async (req, res) => {
    try {
        const newNextAction = await addNextAction(req.body)
        res.status(200).send(newNextAction)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/nextAction/edit', verifyToken, async (req, res) => {
    try {
        const updatedNextAction = await editNextAction(req.body)
        res.status(200).send(updatedNextAction)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/nextAction/delete/:id', verifyToken, async (req, res) => {
    try {
        const updatedNextAction = await deleteNextAction(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/nextAction/list', verifyToken, async (req, res) => {
    try {
        const nextActionsList = await listAllNextActions(req.body)
        res.status(200).send(nextActionsList)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/demographic/add', verifyToken, async (req, res) => {
    try {
        const newDemogrpahic = await addDemogrpahic(req.body)
        res.status(200).send(newDemogrpahic)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/demographic/edit', verifyToken, async (req, res) => {
    try {
        const updatedDemographic = await editDemogrpahic(req.body)
        res.status(200).send(updatedDemographic)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/demographic/delete/:id', verifyToken, async (req, res) => {
    try {
        const deleteDemographicContent = await deleteDemographic(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/demographic/list', verifyToken, async (req, res) => {
    try {
        const demographicList = await listAllDemogrpahics(req.body)
        res.status(200).send(demographicList)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/projectType/add', verifyToken, async (req, res) => {
    try {
        const newProjectType = await addProjectType(req.body)
        res.status(200).send(newProjectType)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/projectType/edit', verifyToken, async (req, res) => {
    try {
        const updatedProjectType = await editProjectType(req.body)
        res.status(200).send(updatedProjectType)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/projectType/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedProjectType = await deleteProjectType(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/projectType/list', verifyToken, async (req, res) => {
    try {
        const projectTypeList = await listAllProjectTypes(req.body)
        res.status(200).send(projectTypeList)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/projectStatus/add', verifyToken, async (req, res) => {
    try {
        const newProjectStatus = await addProjectStatus(req.body)
        res.status(200).send(newProjectStatus)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/projectStatus/edit', verifyToken, async (req, res) => {
    try {
        const updatedProjectStatus = await editProjectStatus(req.body)
        res.status(200).send(updatedProjectStatus)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/projectStatus/delete/:id', verifyToken, async (req, res) => {
    try {
        const deleteProjectStatuz = await deleteProjectStatus(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/projectStatus/list', verifyToken, async (req, res) => {
    try {
        const projectStatusList = await listAllProjectStatus(req.body)
        res.status(200).send(projectStatusList)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/project/add', verifyToken, async (req, res) => {
    try {
        const newProject = await addProject(req.body)
        res.status(200).send(newProject)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/project/edit', verifyToken, async (req, res) => {
    try {
        const updatedProject = await editProject(req.body)
        res.status(200).send(updatedProject)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.delete('/project/delete/:id', verifyToken, async (req, res) => {
    try {
        const deletedProject = await deleteProject(req.params.id)
        res.status(204).send()
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})


router.post('/project/list', verifyToken, async (req, res) => {
    try {
        const projectlist = await listAllProject(req.body)
        res.status(200).send(projectlist)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.post('/project/details', verifyToken, async (req, res) => {
    try {
        console.log('Api Called')
        const projectlist = await projectDetails(req.body)
        res.status(200).send(projectlist)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

router.get('/stage/stage-status', verifyToken, async (req, res) => {
    try {
        const stageArray = await listStagesWithStatus()
        res.status(200).send(stageArray)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
})

export default router