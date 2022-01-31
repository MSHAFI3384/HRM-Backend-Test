import User, { userSchema } from "../models/User";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
//import models from '../../models'
import jwt from 'jsonwebtoken';
import APIError from '../utilities/APIError';
import { omit } from 'lodash';
import { secretKey } from '../devConfig/development.json';
import { MISSING_PARAMETER, USER_NOT_FOUND, PASSWORD_INCORRECT, USER_ALREADY_EXIST } from '../utilities/handleError';

const UserCollection = mongoose.model('User', userSchema);

module.exports = class UserService {

    static async userLogin(data) {
        try {
            if (!data || !data.email || !data.password) {
                throw new APIError(MISSING_PARAMETER)
            }
            let { email, password } = data;
            let user = await User.findOne({ email });
            if (!user) {
                throw new APIError(USER_NOT_FOUND)
            }
            let paswordvalid = await bcrypt.compare(password, user.password);
            if (!paswordvalid) {
                throw new APIError(PASSWORD_INCORRECT)
            }
            const updatedDoc = omit({ ...user._doc }, ['password'])
            const token = jwt.sign(updatedDoc, secretKey)
            return ({ ...updatedDoc, token })
        } catch (error) {
            console.log(`User not found: ${error}`)
        }
    }

}