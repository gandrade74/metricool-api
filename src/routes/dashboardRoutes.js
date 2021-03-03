import express from 'express';
import { setup, getProjectsBoards } from '../controllers/dashboardController';
import { getProjectsValidator } from '../validators/dashboard';

const router = express.Router();

router.get('/projects/boards', getProjectsValidator, getProjectsBoards);
router.post('/', setup);

export default router;
