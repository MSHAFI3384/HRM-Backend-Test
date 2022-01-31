import jwt from 'jsonwebtoken'
import { secretKey } from '../devConfig/development.json'

export const verifyToken = (req, res, next) => {
    try {
        const [, token] = req.headers?.authorization?.split(' ') || ''
        const decoded = jwt.verify(token, secretKey)
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}