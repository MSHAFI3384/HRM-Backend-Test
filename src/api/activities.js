import express from 'express';
import { verifyToken } from '../utilities/auth';
import { handle_server_error } from '../utilities/handleError';
import { apiGetActivityByLeadId, test } from '../controllers/ActivityController';

const router = express.Router();

router.get('/listLeadActivity', verifyToken, async (req, res) => {
    try {
        const leadActivity = await apiGetActivityByLeadId(req)
        return res.status(200).json(leadActivity)
    }
    catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
});

router.post('/test', verifyToken, async (req, res) => {
    try {
        const leadActivity = await test(req)
        return res.status(200).json(leadActivity)
    }
    catch (err) {
        let error = await handle_server_error(err, req)
        res.status(error.code).json(error)
    }
});

export default router