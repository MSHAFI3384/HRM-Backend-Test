import models from '../../models'
import { messages } from '../../devConfig/development.json'
import APIError from '../../utilities/APIError';
import { MISSING_PARAMETER } from '../../utilities/handleError';


export const addProject = newProject => new Promise((resolve, reject) => {
    if (!newProject)
        reject({ message: messages.errors.missingParameters })

    new models.Project(newProject).save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})


export const editProject = updatedProject => new Promise((resolve, reject) => {
    if (!updatedProject || !updatedProject.id)
        reject({ message: messages.errors.missingParameters })

    models.Project.findByIdAndUpdate(updatedProject.id, updatedProject, { new: true }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
    })
})


export const deleteProject = id => new Promise(async (resolve, reject) => {
    try {
        if (!id) {
            throw new APIError(MISSING_PARAMETER)
        }
        let doc = await models.Project.findByIdAndDelete(id);
        resolve(doc)
    } catch (error) {
        reject(error)
    }
})


export const listAllProject = query => new Promise((resolve, reject) => {
    models.Project
        .find(query)
        .populate('location')
        .populate('projectType')
        .populate('projectStatus')
        .exec((err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
})

export const projectDetails = query => new Promise((resolve, reject) => {
    models.Project
        .findById(query.id)
        .populate('location')
        .populate('projectType')
        .populate('projectStatus')
        .exec((err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
})