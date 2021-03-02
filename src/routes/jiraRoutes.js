import express from 'express';
import { getProjects } from '../controllers/jiraController';

const router = express.Router();

router.get('/projects', getProjects);

export default router;
