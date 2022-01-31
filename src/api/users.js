import express from 'express';
import { verifyToken } from '../utilities/auth';
import { handle_server_error } from '../utilities/handleError';
import { checkPaginationOrCount } from '../hooks/query';
import { apiLogin } from '../controllers/UserController';
import { registerUser, login, getUsersList, updateUser, searchUser, changeUserPassword } from '../services/user/users';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const loginData = await login(req.body)
        res.status(200).send(loginData)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await registerUser(req.body)
        res.status(200).send(newUser)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
});

router.post('/list', verifyToken, async (req, res) => {
    try {
        const userList = await getUsersList(req.body)
        res.status(200).send(userList)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
});

router.post('/edit', verifyToken, async (req, res) => {
    try {
        const updatedUser = await updateUser(req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
});

router.get(['/search'], verifyToken, checkPaginationOrCount, async (req, res) => {
    try {
        const userSearchList = await searchUser(req.query)
        return res.status(200).json(userSearchList)
    }
    catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
});

router.post('/passwordchange', verifyToken, async (req, res) => {
    try {
        const updatedUser = await changeUserPassword(req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).send(error)
    }
});

export default router




