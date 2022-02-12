import bcrypt from 'bcryptjs'
import models from '../../models'
import jwt from 'jsonwebtoken'
import APIError from '../../utilities/APIError';
import { omit } from 'lodash'
import { secretKey } from '../../devConfig/development.json'
import { MISSING_PARAMETER, USER_NOT_FOUND, PASSWORD_INCORRECT, USER_ALREADY_EXIST } from '../../utilities/handleError'


export const login = data => new Promise(async (resolve, reject) => {
    try {
        if (!data || !data.email || !data.password) {
            throw new APIError(MISSING_PARAMETER)
        }
        let { email, password } = data;
        let user = await models.User.findOne({ email });
        if (!user) {
            throw new APIError(USER_NOT_FOUND)
        }
        let paswordvalid = await bcrypt.compare(password, user.password);
        if (!paswordvalid) {
            throw new APIError(PASSWORD_INCORRECT)
        }
        const updatedDoc = omit({ ...user._doc }, ['password'])
        const token = jwt.sign(updatedDoc, secretKey)
        resolve({ ...updatedDoc, token })
    } catch (error) {
        reject(error)
    }

})


export const registerUser = data => new Promise(async (resolve, reject) => {

    try {
        if (!data) {
            throw new APIError(MISSING_PARAMETER)
        }
        let alreadyUser = await models.User.findOne({ $or: [{ email: data.email }, { phone: data.phone_number }] })
        if (alreadyUser) {
            throw new APIError(USER_ALREADY_EXIST)
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(data.password, salt);
        const authData = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            email: data.email,
            location: data.location,
            status: data.status,
            role: data.role,
            password: hash
        }
        let user = await new models.User(authData).save();
        user.password = undefined;
        resolve(user)
    } catch (error) {
        reject(error)
    }
})

export const getUsersList = (query) => new Promise((resolve, reject) => {
    try {
        const updatedQueries = omit(query, ['token'])
        let users = models.User.find(updatedQueries).populate(['location']).select('-password')
        resolve(users)
    } catch (error) {
        reject(error)
    }

})

export const updateUser = (user) => new Promise((resolve, reject) => {
    try {
        const updatedUser = models.User.findByIdAndUpdate(user.id, omit(user, ['id']), { new: true })
        resolve(updatedUser)
    } catch (error) {
        reject(error)
    }
})

export const searchUser = queries => new Promise(async (resolve, reject) => {
    try {
        let { query, fields, pagination, count } = queries
        let users;
        if (count) {
            users = await models.User.countDocuments(query)
        } else {
            users = await models.User.find(query, fields, pagination);
        }
        resolve(users)
    } catch (error) {
        reject(error)
    }

})

export const changeUserPassword = (data) => new Promise(async (resolve, reject) => {
    try {
        if (!data || !data.email || !data.password) {
            throw new APIError(MISSING_PARAMETER)
        }
        let { email, password, newpassword } = data;
        let user = await models.User.findOne({ email });
        if (!user) {
            throw new APIError(USER_NOT_FOUND)
        }
        let paswordvalid = await bcrypt.compare(password, user.password);
        if (!paswordvalid) {
            throw new APIError(PASSWORD_INCORRECT)
        } else {
            let hash = { password: await bcrypt.hash(newpassword, await bcrypt.genSalt(10)) }
            const updatedUser = models.User.findByIdAndUpdate(user.id, hash, { new: true })
            resolve({ "message": "Password Change Successful" })
        }
    } catch (error) {
    reject(error)
}
})