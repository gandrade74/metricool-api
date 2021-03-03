import express from 'express';
import { body } from 'express-validator';
import { getProjects, setupProject } from '../controllers/jiraController';

const router = express.Router();

router.get('/projects', getProjects);

router.post('/setup', [body('projectId').notEmpty()], setupProject);

export default router;
