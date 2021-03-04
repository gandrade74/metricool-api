import express from 'express';
import { getProjects, setup, sync } from '../controllers/dashboardController';
import {
  getProjectsValidator,
  createDashboardValidator
} from '../validators/dashboard';
import { verifyJwt } from '../middlewares/jwtMiddleware';

const router = express.Router();

router.get('/projects/boards', verifyJwt, getProjectsValidator, getProjects);
router.post('/', verifyJwt, createDashboardValidator, setup);
router.post('/:dashboardId/sync', verifyJwt, sync);

export default router;
